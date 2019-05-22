---
date: 2015-11-17
summary: NW.js is great for creating desktop applications using Web app technologies. If you're not familiar with NW.js, I'd advise you to read an introductory article like Creating Your First Desktop App With HTML, JS and Node-WebKit to get a good base first. This is a slightly more advanced article intended for anyone interested into distributing their NW.js app to Windows users.
original:
  blogLink: https://www.packtpub.com/books/content/blogs
  blogName: Packt books
  url: https://www.packtpub.com/books/content/building-your-app-creating-executables-nwjs
tags:
  - node-webkit
  - desktop
  - executable
  - distribution
  - generation
  - javascript
  - development
---

## Building Your App: Creating Executables for NW.js

:::summary

How hard can it be to package up your [NW.js](https://github.com/nwjs/nw.js) app into real executables? To be a true desktop app, it should be a self-contained `.exe`, `.app`, or similar. There are a few ways to approach this. Let's start with the simplest approach with the least amount of code or configuration.

:::

It's possible to run your app by creating a ZIP archive containing your app code, changing the file extension to `.nw` and then launching it using the [official npm module](https://www.npmjs.com/package/nw) like this: nw myapp.nw. Let's say you wanted to put your app out there as a download. Anyone looking to use it would have to have nw installed globally too. Unless you're making an app for NW.js users, that's not a great idea.

### Use an existing executable

You could substitute one of the [official NW.js executables](http://dl.nwjs.io/) in for the nw module. You could download a ZIP from the NW.js site containing an executable (`nw.exe` for example) and a few other bits and pieces. If you already have the nw module, then if you go to where it's installed on your machine (e.g. `/usr/local/lib/node_modules/nw` on Mac OS X), the executable can be found in the `nwjs` directorty. If you wanted, you could keep things really simple and leave it at that. Just use the official executable to open your `.nw` archive; i.e. `nw.exe myapp.nw`.

### Merging them

Ideally though, you want as few files as possible. Think of your potential end users, they deserve better. One way to do this is to mash the NW.js executable and your` .nw` archive together to produce a single executable.

This is achieved differently per platform though. On Windows, you need to run `copy /b nw.exe+myapp.nw nw.exe` on the command-line. Now we have a single `nw.exe`. Even though we now have a single executable, it still requires the DLLs and everything else which comes with the official builds to be in the same directory as the .exe for it to work correctly.

You could rename `nw.exe` to something nicer but it's not advised as native modules will not work if the executable isn't named` nw.exe`. This is expected to be [fixed in NW.js 0.13.0](https://github.com/nwjs/nw.js/issues/199#issuecomment-91411953) when NW.js will come with a `nw.dll` (along with `nw.exe`) which modules will link to instead.

On Linux, the command would be `cat path/to/nw myapp.nw > myapp && chmod +x myapp` (where `nw` is the NW.js executable).

Since `.app` executables are just directories on Mac OS X, you could just copy the offical `nwjs` executable and edit it. Rename your `.nw` archive to `app.nw`, put it in the `Contents/Resources` inner directory, and you're done. Actually, a `.nw` archive isn't even necessarily. You could create an `Contents/Resources/app.nw` directory and add your raw app files there. Other noteworthy files which you could edit are `Contents/Resources/nw.icns` which is your app's icon and `Contents/Info.plist`, Apple's app package description file.

### nw-builder

There are a few downsides to all of that; it's platform-specific, very manual, and is very limited. The [nw-builder module](https://github.com/nwjs/nw-builder) will handle all of that for you, and more. Either from the command-line or programmatically, it makes building executables light work.

Once you install it globally by running `npm install -g nw-builder`, then you could run the following command to generate executables:

```
nwbuild your/app/files/directory -o destination/directory
```

nw-builder will go and grab the latest NW.js version and generate self-contained executables for you. You can specify a lot of options here via flags too; the NW.js version you'd like, which platforms to build for, etc. Yes, you can build for multiple platforms. By default it builds 32-bit and 64-bit Windows and Mac executables, but Linux 32-bit and 64-bit executables can also be generated. E.g. `nwbuild appDirectory -v 0.12.2 -o dest -p linux64`.

Note: I am a maintainer of nw-builder. Ignoring my bias, that was surprisingly simple. right?

### Using the API

I personally prefer to use it programmatically though. That way I can have a build script which passes all of the options and so on. Let's say you create a simple file called build.js;

```javascript
var NwBuilder = require('nw-builder');
var nw = new NwBuilder({
  files: './path/to/app/files/**/**' // use the glob format
});

// .build() returns a promise but also supports a plain callback approach as well
nw.build().then(function () {
  console.log('all done!');
}).catch(function (error) {
  console.error(error);
});
```

Running `node build.js` will produce your executables. Simples.

### Gulp

If you already use [Gulp](http://gulpjs.com/) like I do and would like to slot this into your tasks, it's easy. Just use the same nw-builder module;

```javascript
var gulp = require('gulp');
var NwBuilder = require('nw-builder');
var nw = newNwBuilder({
  files: './path/to/app/files/**/**'// use the glob format
});

gulp.task('default', function(){
  return nw.build();
});
```

### Grunt

Yep, there's a plugin for that; run `npm install grunt-nw-builder` to get it. Then add something like the following to your Gruntfile:

```javascript
grunt.initConfig({
  nwjs: {
    options: {},
    src: ['./path/to/app/files/**/*']
  }
});
```

Then running `grunt nwjs` will produce your executables. All nw-builder options are available to Grunt users too.

### Options

There are a lot of options which pretty granular control. Aside from the ones I've mentioned already and options already available in the app manifest, there are ones for controlling the structure and or compression of inner files, your executables' icons, Mac OS X specific options concerning the plist file and so on.

Go check out [nw-builder](https://github.com/nwjs/nw-builder) for yourself and see how quickly you can package your Web app into real executables.
