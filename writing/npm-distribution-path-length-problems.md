---
date: 2015-12-07
summary: You might have been unfortunate enough to learn that Windows has a 256 character limit on file paths. You could've ran into this problem locally or on end users' machines. There's no real workaround but there are preventive measures you can take. Even if you haven't, feel free to take pleasure from reading my horror story.
original:
  blogLink: https://www.packtpub.com/books/content/blogs
  blogName: Packt books
  url: https://www.packtpub.com/books/content/npm-and-distribution-path-length-problems
tags:
  - node-webkit
  - desktop
  - javascript
  - npm
  - distribution
  - windows
  - paths
  - development
---

## npm and distribution path length problems

:::summary

You might have been unfortunate enough to learn that Windows has a 256 character limit on file paths. You could've ran into this problem locally or on end users' machines. There's no real workaround but there are preventive measures you can take. Even if you haven't, feel free to take pleasure from reading my horror story.

:::

### npm

Neither this problem nor our solution are exclusive to Node.js but a lot of the victims of the path length problem were probably running Node.js on Windows. Windows users know that they get left out in the cold often by npm package maintainers but even [the design of npm itself is a problem on Windows from the get-go](https://github.com/joyent/node/issues/6960#issuecomment-46704998).

npm stores your dependencies (listed in your package.json) in a `node_modules` directory. If those dependencies have dependencies of their own they're stored in their own `node_modules` directory (i.e. `your-project/node_modules/a/node_modules/b/`) and so on recursively. It's nice but in hindsight it's obviously incompatible with Windows's path length limit.

### Delete delete delete

Most people have probably been lucky enough to only have come across this problem when trying to delete dependencies where then Windows complains that the path is too long.

A simple way around this is to take a module halfway down deep into your dependency graph (i.e. `node_modules/a/node_modules/b/node_modules/c/.../node_modules/h/`) in Windows Explorer and move it somewhere closer to the root (e.g. `node_modules/`) to cut the file path down before trying to delete it again. This would have to be repeated for every culprit.

There are also some tools which could help. I've noticed that you can delete really long paths while using [7-Zip](http://www.7-zip.org/) File Manager to browse files.

### Runtime errors

If you've ran into actual bugs caused by this, you could find a module halfway down the dependency graph and add it as a dependency to your project so it will be installed under the top level `node_modules` and not a `node_modules` directory n levels deep. Make sure to install the correct version and test thoroughly.

There are also a few Node modules out there which "flatten" your dependency graph. The downside to these modules is that if there is a conflict (package A depends on version 1.0.0 of package Z and package B depends on version 3.2.1 of package Z) then the latest version of the module (package Z) is used, which could be problematic. So be careful.

### Can't npm fix this?

~~You might see people reference Windows APIs (which support long paths) as a possible fix but it is [very unlikely](https://github.com/joyent/node/issues/6960#issuecomment-46704998) <span style="text-decoration: line-through;">this will be fixed in npm.[npm dedupe](https://docs.npmjs.com/cli/dedupe) _should_ help with this too but it's not reliable in my experience.~~

Yes, they, can! This has been fixed as of [npm 3.0.0](https://github.com/npm/npm/releases/tag/v3.0.0) (yet to be released).

Your dependencies will now be installed _maximally_ flat. Insofar as is possible, all of your dependencies, and their dependencies, and THEIR dependencies will be installed in your project's `node_modules` folder with no nesting. You'll only see modules nested underneath one another when two (or more) modules have conflicting dependencies.

Excuse me...

:::figure npm-distribution-path-length-problems/dance.gif \* Dances \*
:::

Mind you, it's a bit late for me. Unless npm 3 also ships with a time machine. More about that in a bit.

### Manually checking for exceedingly long paths

Up until now, I've had to routinely check for long paths using [Path Length Checker](https://pathlengthchecker.codeplex.com/) (on Windows) but a manual check is not good enough as stuff can still slip through the net.

### Introducing gulp-path-length

So there's a simple [Gulp](http://gulpjs.com) plugin to help with this; [gulp-path-length](https://github.com/Teamwork/gulp-path-length). You could use it like this in a Gulp task:

```javascript
var gulp = require('gulp');
var pathLength = require('gulp-path-length');

gulp.task('default', function(){
  gulp.src('./example/path/to/directory/**', {read: false})
      .pipe(pathLength());
});
```

If all is well, nothing will happen. If you have a path exceeding 256 characters, the gulp task will stop and an error reveal the offending path. This is really fast either way as Gulp doesn't need to read the contents of the files. The limit can be changed with a parameter; i.e. `.pipe(pathLength({ maxLength: 50 });`.

This is fine if it's just for you locally but there are bigger fish to fry.

### Distributed long paths

What if there are multiple developers working on your project? What if a developer is using Mac OS X or Linux? There could easily be false positives. It's one thing having issues locally or within a team, it's a whole other thing to have path length problems in production on end users machines.

I've had that pleasure myself with [Teamwork Chat](https://www.teamwork.com/chat), which we built on top of [NW.js](https://github.com/nwjs/nw.js). NW.js is basically Node.js and Chromium mashed together to allow you to create desktop apps from Web apps. Any NW.js can access all of node's core modules and any other modules you've installed from nom, for example. Therefore the npm - Windows path length issue applies here too. Depending on how long the end user's username was, the user might've seen something like this when they tried to launch Teamwork Chat:

:::figure npm-distribution-path-length-problems/fatal.png The NW.js fatal error screen
:::

A dummy application. None of our app code is executed. This means no error reports and no way the app could even auto-update once a patch was released. As a maintainer of [nw-builder](https://github.com/nwjs/nw-builder), I know we're not the only ones who have faced this problem.

### Is there anything we can do?

Once the code is shipped, it's too late. Luckily in my case, we have a rough idea where the files will exist on end users machines thanks to our Windows installer. This is where gulp-path-length's rewrite option comes in. It can be used like this to simulate path lengths:

```javascript
var gulp = require('gulp');
var pathLength = require('gulp-path-length');

gulp.task('default', function(){
  gulp.src('./example/path/to/directory/**', {read: false})
    .pipe(pathLength({
      rewrite: {
        match: './example/path/to/directory/',
        replacement: 'C:\\Users\\a-long-username-here\\AppData\\Blah\\Blah\\Blah'
      }
    }));
});
```

So it doesn't matter where you are on your filesystem or which operating system you're using, it will test the length of files in a given directory as if they're in a hypothetical directory on Windows.

You could run this before you ship your code but we've added this to a compilation build step so we catch it as early as possible. If a Mac developer adds really long paths to the project (like an npm dependency which depends on a chain of [lodash](https://lodash.com/) modules), they'll see right away that this will break stuff for some Windows users. For good measure, we also run it in a continuous integration step.
