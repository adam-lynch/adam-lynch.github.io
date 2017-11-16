---
date: 2015-11-24
summary: NW.js is great for creating desktop applications using Web app technologies. If you're not familiar with NW.js, I'd advise you to read an introductory article like Creating Your First Desktop App With HTML, JS and Node-WebKit to get a good base first. This is a slightly more advanced article intended for anyone interested into distributing their NW.js app to Windows users.
original:
  blogLink: https://engineroom.teamwork.com
  blogName: Teamwork's Engine Room
  url: https://engineroom.teamwork.com/10-things-to-know-about-gulp-2e99176f9c74
tags:
  - gulp
  - build
  - build system
  - javascript
  - node.js
---

## 10 things to know about Gulp

![](/images/blog-content/10-things-to-know-about-gulp/gulp.png)

:::summary

I love [Gulp](http://gulpjs.com/). It’s great in so many ways and for so many purposes. I’ve been putting off writing a post on it forever. There’s just too much to write about; I could write a book on it. So instead, I’m going to give a quick introduction and share a few tips.

:::

Never heard of Gulp? It’s a build system or task runner like Maven, Ant, Grunt, and so on, except much much better. A few other key points:

- Based on Node.js streams.
- Aims to avoid writing to disk unnecessarily for performance.
- The API is really simple. There are four methods.
- Code is favoured over configuration.
- It’s really intuitive. You take some files, you do this, that, and that other thing to them, and then store them somewhere.
- Plugins are really simple and easy to use.
- Takes advantage of existing modules on npm (which has now reached over 200,000 modules by the way), but more about that later.

I’m unlucky enough to have had experience with a host of build systems. My introduction to Gulp happened not long after I joined Teamwork when it was added to one project to begin with. I’ve latched onto it ever since. Now, Gulp is used in every project here for all sorts. I’ve even written and contributed to a lot of Gulp plugins / Gulp-friendly modules, beginning with [gulp-bless](https://github.com/BlessCSS/gulp-bless). It’s really easy! Most Gulp plugins have one source file, less than a hundred lines long.

If you’d like to get up to speed with Gulp, make sure to read [Gulp for Beginners](https://css-tricks.com/gulp-for-beginners/) by Zell Liew (and there’s more where that came from; his [Automate Your Workflow](http://automateyourworkflow.com/) book). Now, onto some tips.

### #1: Gulp doesn’t just compile & minify assets

Don’t get me wrong, there are some great plugins for the frontend (shout out to [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)), but that’s not all the Gulp community has to offer. Pretty much anything you can think of; there’s a plugin for that. Some other uses we’ve found for Gulp include:

- Building desktop apps from Web apps, signing executables, etc.
- Linting, validation and analysis.
- Deploying over FTP, to AWS S3, GitHub pages, etc.
- Generating documentation.
- Static site generation.
- And a lot lot more.

### #2: `gulp.dest` isn’t the end

```javascript
var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.task('default', function() {
  gulp.src('*.md')
    .pipe(gulp.dest('./output'))
    .pipe(gulp.dest('./another'))
    .pipe(rename({
      extname: '.txt'
    }))
    .pipe(gulp.dest('./yet-another'));
});
```

This is a simple but noteworthy one as it's not immediately obvious to everyone. You can save files to disk as many times as you'd like in a pipeline.


### #3: Clean up that gulpfile

Despite how very very simple it is, `gulp-load-plugins` has to be my favourite Gulp plugin. Since ~~"no one plugin should have all that power"~~ Gulp plugins do one thing and one thing well, it's easy to end up with an uncomfortable amount of `require`s at the top of your gulpfile.

```javascript
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('default', function(){
  gulp.src('./input/*')
    .pipe($.if(false, $.replace('hello', 'world')))
    .pipe(gulp.dest('./'))
    .pipe($.debug());
});
```

`gulp-load-plugins` makes all of your plugins (i.e. anything named `gulp-*` in your `package.json`) available to you to as properties of the single object. This has a great side-effect in that for a plugin to be usable at all, for anyone, it must be in your `package.json`. This removes the opportunity for someone to install a plugin (like `npm install gulp-filter`) forgetting the `--save-dev` flag (resulting in it working for them but not the next person on the team to pull their changes and npm install).


### #4: Bend the stream to your will

You'll inevitably need a bit of flexibility in your tasks. For example, you might want to apply some manipulations exclusively to a subset of files within the stream;

```javascript
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('default', function(){
  var pngFilter = $.filter('*.png');

  gulp.src('./images/*')
    .pipe(gulp.dest('./output/images'))
    .pipe(pngFilter)
    // ...
    .pipe(gulp.dest('./output/raster'))
    .pipe(pngFilter.restore())
    .pipe($.filter(function(file){
      return file.contents.toString('utf8').length > 500;
    }))
    // ...
    .pipe(gulp.dest('./output/other'));
});
```

`gulp-filter` accepts a single glob, an array of globs or a function which returns a Boolean (in case your step depends on properties of the files coming down the pipeline). As you can see above, you can use multiple filters per pipeline and even restore (or undo) the filter at any point.

`gulp-if` is similar but not the same. It accepts a "condition" in the form of a Boolean or a function which returns one (like `gulp-filter`). The other two parameters are reserved for the postive and (optional) negative outcomes.

```javascript
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('default', function() {
  var isLong = function(file) {
    return file.contents.toString('utf8').length > 500;
  };

  gulp.src('./*')
    .pipe($.if(isLong, gulp.dest('./output'), gulp.dest('./output2'));
});
```

This is particularly handy when paired with runtime flags and the `gulp-util` module. Using the following example, passing `--mode production` will result in the images being compressed before being copied to the `output` directory. This is useful for skipping over time-consuming steps.

```javascript
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var isProductionMode = $.util.argvs.mode === 'production';

gulp.task('default', function() {
  gulp.src('./*.png')
    .pipe($.if(isProductionMode, $.imagemin())
    .pipe(gulp.dest('./output'));
});
```

What if this all goes wrong? Stick in a call to `gulp-debug` anywhere to see which files are coming down the stream then and there;

```javascript
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('default', function() {
  gulp.src('./abc/**/*.png')
    .pipe($.debug({
      title: 'Before filter'
    }))
    .pipe($.filter('*@2x.png'))
    .pipe($.debug({
      title: 'After filter'
    }))
});
```

`gulp-debug` will then log varying levels of details about the files to the console depending on the options you pass to it.

### #5: There's more to Gulp than Gulp plugins

One of the best things about Gulp is that you can use whichever modules you'd like in your tasks. There are a lot of "Gulp friendly" modules out there on [npm](https://www.npmjs.com/) which support streams and Gulp's `vinyl` files. Even if a module doesn't, you can do whatever you'd like within a task anyway, you just won't be able to easily pipe to/from it in a pipeline. Here are some of our favourite modules which aren't named `gulp-*`:

- [`browser-sync`](http://browsersync.io/):
  - Quickly spin up a little local server to serve your files for testing.
  - Sync clicks, scrolls, and more across browsers.
  - Watch files and inject changes on the fly.
  - Essential for testing responsive designs.
- [`critical`](https://github.com/addyosmani/critical): Extract & inline critical-path CSS in HTML pages.
- [`nw-builder`](https://github.com/nwjs/nw-builder): Generate executables from [NW.js](https://github.com/nwjs/nw.js) apps.
- [`inquirer`](https://github.com/SBoudrias/Inquirer.js/): _The_ module for prompting the user for input, validating input, etc.
- [`main-bower-files`](https://github.com/ck86/main-bower-files): Parses your `bower.json` and gives you a list of your dependencies `main` files.


### #6: `gulpfile.coffee`

```coffeescript
gulp = require 'gulp'
$ = require('gulp-load-plugins')()
isProductionMode = $.util.argvs.mode is 'production'

gulp.task 'default', ->
  gulp.src './*.png'
    .pipe $.if isProductionMode, $.imagemin()
    .pipe gulp.dest './output'
```

Gulp supports CoffeeScript since version 3.7\. Once you `npm install --save-dev coffee-script` in the same directory as your gulpfile, you can have a `gulpfile.coffee` intead of a `gulpfile.js` and everything will work as normal.

### #7: More accurate timing

Gulp logs whenever a task starts, when it finishes, and how long it took. Gulp is fast, but it's easy to be fooled into thinking it's faster than it is if you have asynchronous code in a task. Take this gulpfile for example:

```javascript
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('images', function() {
  setTimeout(function() {
    $.util.log("Tada! Images is really done.");
  }, 3000);
});

gulp.task('default', ['images'], function() {
  $.util.log('Default is running...');
});
```

So our `default` task does some logging but first has a dependency on an `images` task does some logging after three seconds. If you were to run `gulp`, you'd see something like this:

```
Starting 'images'...
[22:21:07] Finished 'images' after 465 μs
[22:21:07] Starting 'default'...
[22:21:07] Default is running...
[22:21:07] Finished 'default' after 70 ms
[22:21:10] Tada! Images is really done.
```

Wait, the `default` task starts before the `images` task logs its message? Note we're also being told `images` only took 465 micro-seconds. There are three ways we can fix this.

One way is to return a reliable stream, but that doesn't apply here so we'll move on. Quick side note: if you are using a gulpfile.coffee like mentioned above, CoffeeScript's implicit return (i.e. the last line of every function becomes a `return` statement when compiled) which could help tighten us task timings without you realising it.

One way to solve this is to use the task's callback argument like this:

```javascript
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('images', function(done) {
  setTimeout(function() {
    $.util.log("Tada! Images is really done.");
    done();
  }, 3000);
});

gulp.task('default', ['images'], function() {
  $.util.log('Default is running...');
});
```

Note, `done` can only be called once per task and it can also be called with an `Error` which will end the task appropriately. The output would now be something like the following:

```
[22:31:19] Starting 'images'...
[22:31:22] Tada! Images is really done.
[22:31:22] Finished 'images' after 3.07 s
[22:31:22] Starting 'default'...
[22:31:22] Default is running...
[22:31:22] Finished 'default' after 653 μs
```

3.07 seconds, that's more like it. Gulp also supports promises in tasks and that's the other way we can solve it;

```javascript
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var Promise = require('es6-promise').Promise;

gulp.task('images', function() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      $.util.log("Tada! Images is really done.");
      resolve();
    }, 3000);
  });
});

gulp.task('default', ['images'], function() {
  $.util.log('Default is running...');
});
```

Note: calling `reject` anywhere in the task with an `Error` would be just like calling the `done` callback with one.

### #8: Flatten task dependencies for concurrency

Don't group task dependencies by purpose, even though that might make most sense initially. Gulp uses Orchestrator underneath, which is described as "a module for sequencing and executing tasks and dependencies in maximum concurrency." Dependencies are ran in parallel, as much as your dependency graph permits. So, what you really should do is try to flatten that graph as much as possible.

If you had these tasks for example:

```javascript
gulp.task('default', ['frontend']);

gulp.task('frontend', ['styles', 'scripts', 'images', 'templates']);

gulp.task('styles', ['css', 'inline-above-fold-styles', 'images']);

gulp.task('css', function(){ ... });

gulp.task('inline-above-fold-styles', function(){ ... });

gulp.task('scripts', ['bundle-a', 'bundle-b']);

gulp.task('bundle-a', function(){ ... });

gulp.task('bundle-b', function(){ ... });

gulp.task('images', function(){ ... });

gulp.task('templates', ['styles'], function(){ ... });
```

There are a few problems here, but look at how `templates` depends on `styles`. This means that all of `styles` need to finish before `templates` can run, even though it might actually only depend on `inline-above-fold-styles` for example. The first change here that I'd make is to remove the `styles` task altogether and have `templates` depend directly on `inline-above-fold-styles`;

```javascript
gulp.task('default', ['css', 'inline-above-fold-styles', 'scripts', 'images', 'templates']);

gulp.task('css', function(){ ... });

gulp.task('inline-above-fold-styles', function(){ ... });

gulp.task('scripts', ['bundle-a', 'bundle-b']);

gulp.task('bundle-a', function(){ ... });

gulp.task('bundle-b', function(){ ... });

gulp.task('images', function(){ ... });

gulp.task('templates', ['inline-above-fold-styles'], function(){ ... });
```

So yeah, remove any tasks there for decoration and flatten the dependency graph as much as possible.


### #9: Forget about Yeoman

Ok, that heading is pure sensationalism. If you don't know [Yeoman](http://yeoman.io/) is, it's a tool for scaffolding or bootstrapping projects. So someone creates a "generator" which when ran might ask you a few questions (like "Would you like to use JavaScript or CoffeeScript?") and then spit out a skeleton project for you. There are thousands of Yeoman generators out there for all sorts of apps, [take a look](http://yeoman.io/generators/).

Let's say you create a lot of similar projects or even directories within a project and you'd like to have a template for that so you can quickly generate it as you go. Well, you could learn the Yeoman API but everything Yeoman does is already doable with Gulp, so why not just use Gulp plugins? You can easily copy files, prompt the user, and so on. Well that's what [Slush](http://slushjs.github.io/) is; "The streaming scaffolding system. Gulp as a replacement for Yeoman."

It's really easy to create a Slush generator. A Slush generator is just a globally installed module with a `slushfile` (which is just a gulpfile). Here's a very simple one:

```javascript
var gulp = require('gulp');

gulp.task('default', function() {
  gulp.src(_dirname + '/**/*')
    .pipe(gulp.dest('./'));
});
```

This just copies all files in the generator's directory to the user's current directory. Notice that you need to use `__dirname` when pointing to files within the generator.

To use this generation is must be named something like `slush-something` and `slush` itself must also be installed globally. Then running `slush something` will run your generator (i.e. call the `slush-something` generator's slushfile).

There are very few Slush generators in comparison to Yeoman, so if you're looking for a Slush generator, then maybe stick to Yeoman (for now), but if you're writing one, I'd suggest using Slush. Why not kill two birds with the one API?

### #10: gulp-grunt

If you're still using Grunt (poor you!) then the [`gulp-grunt`](https://github.com/gratimax/gulp-grunt) gulp plugin can help you transition bit by bit to Gulp. This plugin allows you to run your Grunt tasks from Gulp and even have your Gulp tasks depend on Grunt tasks. If you want to know, [gulp-grunt's comprehensive readme](https://github.com/gratimax/gulp-grunt) has you covered.
