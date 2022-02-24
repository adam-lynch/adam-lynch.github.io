---
date: 2022-02-25
tags:
  - cypress
  - vite
  - preprocessor
  - webpack
  - testing
  - tests
  - end-to-end
  - unit-tests
  - integration-tests
  - continuous-integration
  - build-tool
  - bundler
  - compilation
  - javascript
  - typescript
---

## How to preprocess Cypress tests with Vite

::: summary

Vite and Cypress are fantastic, but I bet you already know that. The lowest “satisfaction” rating Cypress has ever received in a ‘The State of JS’ survey is 92%. In the latest survey, Vite took home awards for ‘Highest Satisfaction’ (97.4%) and ‘Highest Interest’ (83%).

It’s clear why. Vite is a blazing fast feature-rich build tool from the creator Vue. Cypress is a versatile test runner which supports a surprising amount of browser test runners, continuous integration, time-travel debugging, and more.

Today I’m going to explain how to preprocess your Cypress unit tests with Vite because, well, I had to figure it out and no one has written about it yet.

:::

[Skip right to the solution](#the-solution).

## The problem

I switched over to Vite from alternatives like Webpack and Parcel, for building web apps, browser extensions, and more. Once you use Vite for something, you’ll want to use it for everything.

Every now and again though, I’d spot an issue in a subset of my tests. E.g. something would work slightly differently when under test. Maybe I’d tweak a little bit of code, re-run a test, shrug it off. I eventually dug into this and discovered that Cypress was compiling my tests using Webpack.

This isn’t ideal. Just as it makes sense to align your development or staging environment as closely as possible to production. You wouldn’t want to have to configure Vite and Webpack separately just for your tests.

I’ll give you a real example. I couldn’t use optional chaining, e.g. `if (x?.y?.z) {`. Why? Despite it being supported in all modern browsers (i.e. 92% of users worldwide), Webpack 4 didn’t support it.

You could figure out how to get it working with Webpack, sure. You could set up and configure Babel. You see Vite doesn’t use Babel and this kind of thing “just works” out of the box.

This won’t be a once-off either; maybe next time it will be an issue with imports, aliases, or TypeScript. Before you know it, you’ll be reading Webpack version migration guides again. This is what I wanted to get away from.

So why bother? It would be easier to use Vite everywhere.


## Setting the scene

I want to be clear when and where this solution is applicable. For the sake of this article, let’s overly-simplify testing into these categories:

- **Web app end-to-end integration tests**. I.e. serve your web app, visit a URL, click and type some stuff, navigate around a bit. You might mock some APIs. These are good for smoke testing critical user flows.
- **Unit tests**. I.e. test a unit of code like a function or class in isolation, using a barrage of inputs and asserting the outcomes match expected results. These might purely depend on arguments but they could also interact with the DOM. These could be considered integration tests if they included more than one “unit”, but the key point is that it’s a locally imported file / module that’s being tested in isolation.
- **Component tests**. For example, Cypress has React and Vue integrations which mount your UI components for you and allow you to automate interactions. These generally involve less infrastructure and are faster to boot up. These could be considered integration or unit tests, but the key point is that they’re testing a specific UI component in isolation.

The problem at hand isn't really applicable to end-to-end or component tests. Take end-to-end tests for example; you’d run a Vite command to serve your web app and visit `localhost:*` in your tests.

Your web app code would be compiled with Vite. Your test code wouldn’t but it probably wouldn’t be a huge issue given most of your test code would be simple calls to Cypress APIs (e.g. `cy.get('button').click()`).

My solution does not apply to component tests either. That's a whole other kettle of fish. How component tests are bundled and built is extremely different to other Cypress tests. The preprocessor hook I’ll be using isn’t supported for component tests. However, the Cypress team have created a `@cypress/vite-dev-server` package to handle that use case. See [JessicaSachs/cypress-loves-vite](https://github.com/JessicaSachs/cypress-loves-vite/blob/develop/cypress/plugins/index.js#L23) for an example.

Unit tests are where the problem occurs the most. In my case, I was unit testing a JavaScript library. There was no framework in sight.

Let’s look at a unit test example.


## Example

A test would read something like this:

1. Import my library.
1. Open a local HTML file (fixture) (using `cy.visit`).
1. Call one of library’s functions.
1. Assert the function result.
1. Assert any DOM changes.
1. (Implicitly) assert that no errors were thrown.

To run this test, Cypress uses Webpack to bundle up the test, including any imports, and injects it into the test runner. So my test code *and* library would be compiled with Webpack.


## The solution

In your test directory, `plugins/index.js` allows us to hook into the Cypress runtime and customize it;

```javascript
module.exports = (on, config) => {
  on('file:preprocessor', async ({ filePath, outputPath, shouldWatch }) => {
    // TODO: compile with Vite
    return outputPath;
  });

  return config;
};
```

Using the `on` function, we can intercept any requests to preprocess a file. The callback will be called once per file. We’ll then compile the file using Vite’s JavaScript API rather than the default Webpack preprocessor. 

As you can see, we’re told where the input file is and where the compiled file should be written to in the filesystem.


## HTML files

This callback will fire for HMTL files (when open / visit any HTML fixtures in your tests). This is how to preprocess a HTML file (including any assets imported / loaded by it):

```jsx
const path = require('path');
const vite = require('vite');

module.exports = (on, config) => {
  on('file:preprocessor', async ({ filePath, outputPath, shouldWatch }) => {
    const filename = path.basename(outputPath);
    const filenameWithoutExtension = path.basename(outputPath, path.extname(outputPath));

    const viteConfig = {
      build: {
        emptyOutDir: false,
        minify: false,
        outDir: path.dirname(outputPath),
        sourcemap: true,
        write: true,
      },
    };

    if(filename.endsWith('.html')) {
      viteConfig.build.rollupOptions = {
        input: {
          [filenameWithoutExtension]: filePath,
        },
      };
    }

    await vite.build(viteConfig);	
    return outputPath;
  });

  return config;
};
```

We call `vite.build` with some config, instructing it where the input file is (`build.rollupOptions.input`) and which directory to write output file(s) to.

Side note: yes, Vite uses Rollup under the hood.


## JavaScript files

For JavaScript files, Vite will ask us to preprocess our test specs. Vite will then traverse imports (e.g. your library) and create a single bundle / output JavaScript file.

```jsx
if(filename.endsWith('.html')) {
	// ...
} else {
  viteConfig.build.lib = {
    entry: filePath,
    fileName: () => filename,
    formats: ['es'],
    name: filenameWithoutExtension,
  };
}

await vite.build(viteConfig);
```

We’re using Vite’s “library mode” here. This primarily exists for compiling open-source libraries and npm packages.

I’ll quickly explain the new config options above:

- `entry` is the entry point of the bundle, i.e. the input JS file.
- The `fileName` allows us to customize the output filename. We use the original filename.
- `formats` determines which bundle formats to output. If you’ve made an open-source library, you may have supported multiple build targets / module loaders. Typically you’d have multiple output files, each containing your library wrapped in boilerplate ensuring compatibility with a certain module loader. Think Node's CommonJS style `require`s vs ES module `import`s vs global `window.*` functions.
- `name` is a name for the file / module, which is used in said boilerplate wrapping the JS in the output file. E.g. `export default function EXAMPLE_NAME () { /* ... */ }`.

Try running your tests now, they’ll be preprocessed with Vite!


## TypeScript files

Cypress supports `.spec.ts` test files and imports. None of what I'm covering is any different if you're using TypeScript.


## Watch mode

If you run your tests with the interactive test runner (not the headless Electron test runner), you’ll notice that neither your test code nor imported files are being watched. When edited, the tests should stop and re-run. Let’s implement that;

```jsx
if(filename.endsWith('.html')) {
  // ...
} else {
  // ...
}

if(shouldWatch) {
  viteConfig.build.watch = true;
}

const watcher = await vite.build(viteConfig);

if (shouldWatch) {
  watcher.on('event', (event) => {
    if (event.code === 'END') {
      file.emit('rerun');
    }
  });
  file.on('close', () => {
    watcher.close();
  });
}
```

First, if Cypress’ `shouldWatch` argument is truthy, we tell Vite to not only build the files, but to watch and rebuild them when they change.

`vite.build` returns a Rollup watcher instance. When this emits an `END` event (i.e. an edit has happened and the bundle has been recompiled), we instruct Cypress to rerun the tests.

Finally, if Cypress tells us we no longer need to watch the file (via the file `close` event), we kill the Vite watcher. This would happen when you close the window for example.


## Caching

The same file could be preprocessed multiple times. E.g. if you click a button to rerun the tests or if you save a file in your IDE without any making any changes. Skipping unnecessary rebuilds would speed things up then;

```jsx
// ...

const cache = {};

module.exports = (on, config) => {
  on('file:preprocessor', async ({ filePath, outputPath, shouldWatch }) => {
    if (cache[filePath]) { // *NEW*
      return cache[filePath];
    }

    // ...

    if(filename.endsWith('.html')) {
		  // ...
		} else {
		  // ...
		}

    if(shouldWatch) {
      viteConfig.build.watch = true;
    }

    const watcher = await vite.build(viteConfig);

    if (shouldWatch) {
      watcher.on('event', (event) => { /* ... */ });
      file.on('close', () => {
        delete cache[filePath]; // *NEW*
        watcher.close();
      });
    }
	
    cache[filePath] = outputPath; // *NEW*
    return outputPath;
  });

  return config;
};
```

We’re keeping an in-memory map (`cache`) of input file paths to output paths. We populate this at the very end of the `on` callback after any file is compiled.

1. The first time a file is preprocessed, we build the bundle and start the watcher.
1. If the file is changed, we delete the cache entry and trigger a re-run.
1. If was no change to the file but it's requested again, we skip the build and return the `outputPath` result.
1. When Cypress lets us know we no longer have to watch a file, we delete it from our cache.


## A note about Vite config

I’m hardcoding some config here. In reality, you might want to reuse config from your main Vite web app build; e.g. maybe you’ve created an import alias. What you can do is import your Vite config and pass it to vite.build along with the additional config I’ve included in my examples above.


## Can’t you just ______?

Sure, Webpack may add support for X feature eventually. Sure, build tools can update their Webpack dependency versions (although the most downloaded version is v4 right now). Sure, I could configure Babel.

The root issue here was that Webpack snook into my dependencies at all, preventing me from using newer language features and causing issues. I no longer have to worry about any Webpack version or bundler inconsistencies.


## Example project

[adam-lynch/vite-preprocessed-cypress-tests](https://github.com/adam-lynch/vite-preprocessed-cypress-tests)


## Further reading

- [Cypress’ Preprocessors API](https://docs.cypress.io/api/plugins/preprocessors-api).
- [Write Cypress Markdown Preprocessor](https://glebbahmutov.com/blog/write-cypress-preprocessor/).
- [Vite’s library mode](https://vitejs.dev/guide/build.html#library-mode).
- [The State of JS](https://2021.stateofjs.com/) survey.
- [Devon Govett’s tweet](https://twitter.com/devongovett/status/1493970460815601665?t=6W5ZHs5kk8ZBFwsbIXOHeQ&s=19) about build tools lacking support for features most browsers support.
