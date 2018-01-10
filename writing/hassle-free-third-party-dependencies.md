---
date: 2014-08-29
summary: How do you manage your third-party assets? With my simple setup, all I have to do is run one command and reload the page. Lets take a look at managing our third-party dependencies with Bower and preprocessing them…  
original:
  blogLink: https://engineroom.teamwork.com
  blogName: Teamwork's Engine Room
  url: https://engineroom.teamwork.com/hassle-free-third-party-dependencies-9b6e0a4884ce
tags:
  - dependencies
  - assets
  - javascript
  - css
  - third-party
---

## Hassle-free third-party dependencies

:::summary

How do you manage your third-party assets? With my simple setup, all I have to do is run one command and reload the page.

Lets take a look at managing our third-party dependencies with Bower and preprocessing them with Gulp & main-bower-files. This post is intended for existing Bower users as well as anyone who hasn’t even heard of it.

:::


### Bower

:::figure hassle-free-third-party-dependencies/bower.png
:::

[Bower](/content/images/2014/Aug/bower-3.png) is an unopinionated package manager for the web. John Lindquist (from [egghead.io](/content/images/2014/Aug/gulp-3.png)) was nice enough to record a quick overview;

[![](/images/blog-content/hassle-free-third-party-dependencies/egghead.png)](https://www.youtube.com/watch?v=vO_Ie3kMXbY)

That’s it! As is often said:

:::quote 
Bower is just a package manager.
:::


### Installation

Bower depends on [Node.js](http://nodejs.org/) and npm (which comes bundled with Node.js).

To install Bower globally, run:

```
npm install -g bower
```

Make sure that [git](http://git-scm.com/) is installed as some Bower packages require it to be fetched and installed. Side note: another great thing about Bower is that you can install anything from [GitHub](http://github.com) (or even [Gist](https://gist.github.com/)), even if it doesn’t support Bower (i.e. does not have a `bower.json`); anything with a public git URL can be installed.


### A naive project

Let’s dig into an example. Here’s how a basic project using Bower might be structured:

```
app/
- index.html
- main.js
- style.css

.gitignore
bower.json
readme.md
```

Let's assume we already have these files and have ran `bower init` to generate a `bower.json`.


#### Adding bootstrap

So, if we were to run `bower install bootstrap --save`, [Bootstrap](http://getbootstrap.com/) would be installed under `bower_components/bootstrap`. The `--save` argument saves Bootstrap to our `bower.json` (see the `dependencies` property).

The project would now look like this:

```
app/
- index.html
- main.js
- style.css

bower_components/ **NEW**
- bootstrap/ **NEW**
- jquery/ **NEW**

.gitignore
bower.json
readme.md
```

Notice that `jquery` is installed here as well because it is a dependency of `bootstrap` itself (as set in its own `bower.json`).

Note: if you're used to npm, notice here that Bower uses a flat dependency tree.

`bower.json`:

```json
{
  "name": "typical-project",
  "version": "0.0.1",
  "authors": [
    "Adam Lynch adam@teamwork.com"
  ],
  "main": "app/*",
  "license": "MIT",
  "private": true,
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "test",
    "tests"
  ],
  "dependencies": {
    "bootstrap": "~3.2.0"
  }
}
```

`app/index.html`:

```markup
<!-- Example to prove Bootstrap exists -->
<div class="alert alert-info alert-dismissible">
    <button class="close" type="button" data-dismiss="alert">×<span class="sr-only">Close</span></button>
    <strong>Heads up!</strong>
    If this alert is blue, Bootstrap;'s CSS was loaded. If you can dismiss this alert, then jQuery & Bootstrap's JavaScript has
    been loaded.
</div>
<script src="../bower_components/jquery/dist/jquery.min.js"></script>
<script src="../bower_components/bootstrap/dist/js/bootstrap.js"></script>
<script src="main.js"></script>
```

Here we link to the files we need. How do we know which are needed? Well, a package's `bower.json` (typically) has a [`main` property](https://github.com/bower/bower.json-spec#main) which lists them.

Note: if you're used to npm, notice here that a package can have a `main` file which isn't JavaScript and can have more than one `main` file.


#### Problems

- We need to figure out which files we need to link to (including those of our dependencies’ dependencies).
- There is an unnecessary amount of HTTP requests; one per `main` file.
- The explicit `../bower_components` in the asset URLs feels dirty.
- Unnecessary tight coupling between `app/index.html` and our dependencies.

What if we want to add / remove a dependency? What if we update a dependency and the new version has different `main` files? Or the updated package's own dependencies have changed? Answer: we'll have to figure it all out again and update `index.html`. The `main` property supports wildcards, which only makes it more awkward.

- We have no opportunity to preprocess the dependencies.

- Too easy to forget to to use `--save` when installing a dependency. What happens then is that your `bower.json` (which is typically checked into version control) won't be updated but your `bower_components` directory (typically ignored from version control) will be. Lets say you then updated your HTML to point to the new dependency in `bower_components`, but the next time a teammate updates the codebase, `bower.json` will be out of sync with the app code. So when they run `bower install` then the new dependency won't be installed and likely cause errors in your app.


##### The explicit `../bower_components`

This one is easy. Bower supports additional configuration via an optional `.bowerrc` JSON file. We'll add that, with the following content to tell Bower where to install our dependencies:

```json
{
  "directorys": "app/third-party"
}
```


##### The other problems

Now, how will Bower solve the rest of our problems? Well, actually, it won't.

:::quote
Bower is **just** a package manager.
:::


### Gulp

:::figure hassle-free-third-party-dependencies/gulp.png
:::

That's where [Gulp](http://gulpjs.com) comes in; a Node.js-based streaming build system. It's simple, intuitive and really fast. I won't go into too much detail on how Gulp works here as it's not needed, but if you're interested, see [Building With Gulp](http://www.smashingmagazine.com/2014/06/11/building-with-gulp/).


#### Setup

If you're unfamiliar with npm, know that it is Node.js' package manager which Bower took some inspiration from;

| Description | Bower | Node.js |
| ------------- | ------------- | ----- |
| The JSON manifest | `bower.json` | `package.json` |
| Where dependencies go | `bower_components` | `node_modules` | 
| An example command | `bower init` | `npm init` |

To get set up, we need to run the following:

```
npm init
npm install -g gulp
npm install gulp
npm install gulp-concat --save-dev
npm install gulp-filter --save-dev
npm install main-bower-files --save-dev
```

This will generate a `package.json` for us, install Gulp globally and locally, along with a couple of handy Gulp plugins and [main-bower-files](https://github.com/ck86/main-bower-files), a "Gulp-friendly" Node.js module

Note: `--save-dev` is just like `--save` except the dependency is saved under the `devDependencies` property, instead of the `dependencies`. This is supported by both npm & Bower.


#### Preprocessing the dependencies

We need a new `gulpfile.js` file at the root which will generate two single files, `third-party.js` and `third-party.css`;

```javascript
var gulp = require('gulp');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');

var filterByExtension = function(extension) {
  return filter(function(file) {
    return file.path.match(new RegExp('.' + extension + '$'));
  });
};

gulp.task('default', function() {
  var mainFiles = mainBowerFiles();

  if (!mainFiles.length) {
    // No main files found. Skipping....
    return;
  }

  var jsFilter = filterByExtension('js');
  return gulp.src(mainFiles)
    .pipe(jsFilter)
    .pipe(concat('third-party.js'))
    .pipe(gulp.dest('./app'))
    .pipe(jsFilter.restore())
    .pipe(filterByExtension('css'))
    .pipe(concat('third-party.css'))
    .pipe(gulp.dest('./app'));
});
```

You're probably ahead of me, but what's happening here is:

- main-bower-files reads our `bower.json`.
- Gets the list of `dependencies`.
- Reads our `.bowerrc` to see where our Bower dependencies are installed to (`app/third-party/`).
- Reads each dependencies’ own `bower.json` and their own dependencies' `bower.json`.
- Gets the list of `main` files.
- Filters this set of files down to just the JavaScript files.
- Concatenates all of these into a `third-party.js` file.
- Stores it in the `app/` directory.
- Restores the list of files to the original list (i.e. undoing the filtering).
- Filters the files down to just the CSS `main` files.
- Concatenates them into a `third-party.css` file.
- Stores it in the `app/` directory.

So now our `app/index.html` would look like this:

```markup
<!-- Example to prove Bootstrap exists -->
<div class="alert alert-info alert-dismissible">
    <button class="close" type="button" data-dismiss="alert">×<span class="sr-only">Close</span></button>
    <strong>Heads up!</strong>
    If this alert is blue, Bootstrap;'s CSS was loaded. If you can dismiss this alert, then jQuery & Bootstrap's JavaScript has
    been loaded.
</div>
<script src="third-party.js"></script>
<script src="main.js"></script>
```

And our final project structure looks like this:

```
app/
- index.html
- main.js
- style.css
- third-party/
- bootstrap/
- jquery/

node_modules/
- gulp
- gulp-concat
- gulp-filter
- main-bower-files

.bowerrc
.gitignore
bower.json
gulpfile.js
package.json
readme.md
```


#### Benefits

If you're not thinking this is an ideal setup yet, keep reading. We've solved all of our problems from earlier:

- The hassle of figuring out what to include in our page is gone (thanks to `main-bower-files`).
- Only two files are requested now. If you wanted, you could concatenate your own JavaScript and CSS with these files so you’d wouldn’t need _any_ additional HTTP requests for your dependencies.
- No more `../bower_components` in the asset URLs.
- Our workflow is streamlined because `app/index.html` and our dependencies are no longer tightly coupled.

We could quickly change our dependencies and simply reload without having to touch our HTML. For example:

- `bower install d3`

- `bower install moment\#2.7.0`

- `bower uninstall d3`

- `bower update moment`

- We ~~have no opportunity to~~ _can_ preprocess the dependencies.

  If we wanted, we could do whatever we'd like to any `main` file or any of the resultant `third-party` JavaScript or CSS files. All we'd have to do is add a new `.pipe(...)` to our `gulpfile.js`. If you'd like an idea of some of the things you could do, see the list of [Gulp plugins](http://gulpjs.com/plugins/).

- You'll never forget to `--save`. Since `main-bower-files` reads your `bower.json` when compiling `third-party.css` and `third-party.js`, you _have_ to `--save` to be able to use the dependency in your app.

Plus:

- Dependency order is maintained.

  The order in which our dependencies are listed in your `bower.json` is the order in which their `main` files are concatenated together.


### Caveats


#### Overrides

What if you wanted to explicitly set the `main` file(s) for a dependency? See the [main-bower-files readme](https://github.com/ck86/main-bower-files#overrides-options) on overriding the `main` property.

Why might you need to do this?

- If you’d prefer a certain package’s `main` file pointed to a different file. E.g. `knockout.debug.js` instead of `knockout.js`.
- When a package you installed has no `main` file or a `bower.json` at all (as I said was possible earlier). This is an unlikely case and main-bower-files will warn you when it happens. Typically the project maintainer would be open to adding the `bower.json` or `main` property once notified of the problem.


#### Scope 

With this setup, all our dependencies will be created as globals. I've deliberately avoided talking about AMD, CommonJS and shimming to keep this as simple as possible.

#### Source maps

Since our dependencies are combined into one file, it's harder to debug. It would be even worse if we had minified them. Source maps were created for this reason. If we generated source maps, then our browser could parse the source map automatically and make it appear as though you're running unminified and uncombined files, without impacting performance. See the [gulp-concat readme](https://github.com/wearefractal/gulp-concat#source-maps) on how to generate source maps.


### Conclusion

Now thanks to Bower, Gulp and main-bower-files, we have a hassle-free dependency setup. All we have to do is to run `gulp` and reload the page after installing a new dependency. Have a look at the [example project](https://github.com/Teamwork/main-bower-files-and-gulp) on GitHub for you to play around with.

It could be simplified even more, for example:

- Add a Gulp task to watch the `bower.json` for changes, then recompile the `third-party` files and reload the page.
- Combine our own `style.css` and `main.js` with `third-party.css` and `third-party.js` so we'd only have to load one CSS and one JavaScript file.
- Add source maps.

But I'll leave that up to you :)
