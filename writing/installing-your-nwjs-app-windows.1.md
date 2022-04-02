---
date: 2015-12-09
summary: NW.js is great for creating desktop applications using Web app technologies. If you're not familiar with NW.js, I'd advise you to read an introductory article like Creating Your First Desktop App With HTML, JS and Node-WebKit to get a good base first. This is a slightly more advanced article intended for anyone interested into distributing their NW.js app to Windows users.
original:
  blogLink: https://www.packtpub.com/books/content/blogs
  blogName: Packt books
  url: https://www.packtpub.com/books/content/installing-your-nwjs-app-windows
tags:
  - node-webkit
  - desktop
  - javascript
  - windows
  - install
  - installer
  - development
---

## Installing your NW.js app on Windows

[NW.js](https://github.com/nwjs/nw.js) is great for creating desktop applications using Web app technologies. If you're not familiar with NW.js, I'd advise you to read an introductory article like [Creating Your First Desktop App With HTML, JS and Node-WebKit](http://tutorialzine.com/2015/01/your-first-node-webkit-app/) to get a good base first. This is a slightly more advanced article intended for anyone interested into distributing their NW.js app to Windows users. I've been through it myself with [Teamwork Chat](https://www.teamwork.com/chat) and there are a few things to consider. What exactly should you provide the end user with? How? Where? And why?

### What to ship

If you want to keep it simple you can simply package everything up into a ZIP archive for your users to download. The ZIP should include your app, along with all of the files generated during the build; the dynamic-link libraries (`.dll`s), the nw.pak and the other PAK files in the locales directory. All of these extra files are required to be certain your app will function correctly on Windows, even if they already have some of these from a previous installation of Google Chrome, for example.

When I say you need to include "your app" in this archive, I of course mean your `myApp.exe` if you've used the [nw-builder module](https://github.com/nwjs/nw-builder) to build your app (which I recommend).

If you want to use the [.nw method](https://github.com/nwjs/nw.js/wiki/How-to-run-apps) of running your app, you will have to distribute your app in separate pieces; `nw.exe`, a `.nw` archive containing your app code and `myApp.ink` a shortcut which executes `nw.exe` with your `.nw` archive. This is how the popular [Popcorn Time](https://popcorntime.io/) app works.

You could rename `nw.exe` to something nicer but it's not advised to ensure [native module compatibility](https://github.com/nwjs/nw.js/issues/199#issuecomment-91411953).

### Installers

Giving the user a simple ZIP isn't optimal though. It isn't the most user-friendly option and you wouldn't have much control over what the user does with your app; where they put it, how many copies of your app they have, etc. This is where installers come in. E.g. [Inno Setup](http://www.jrsoftware.org/isinfo.php), [NSIS](http://nsis.sourceforge.net/Main_Page) or [Install Shield](http://www.flexerasoftware.com/producer/products/software-installation/installshield-software-installer/). The applications provided to build these installers can be configured to grab all of your files and store them wherever you choose on the user's machine, pin your app to their start menu and a whole host of other options.

### Where to store your app

The first place that springs to mind is Program Files, right? Well, if your app has to add / overwrite / remove files from the directory in which it's located then you'll run into problems with permissions. To get around this I suggest storing your app in `C:\Users\<username>\AppData\Roaming\MyApp` like a handful of big name apps do.

If you really need to store your app in Program Files then you could theoretically use something like the node-windows node module to elevate the privileges of the current user to a local administrator and execute the problematic filesystem interactions using Windows services. This means though that Windows' UAC (User Account Control) may show for the user depending on their settings. If you were to use node-windows, this also means that you'd have to pass Windows commands as strings instead of using the fs module.

Another possible location is `C:\Users\Default\AppData\Roaming\MyApp`. Anything stored here will be copied to `C:\Users\<new-username>\AppData\Roaming\MyApp` for each new user profile created on the machine. This may or may not suit your application or you might even want to let the user to decide (by having this as an option in the installer).

### What to sign

If you're digitally signing your app with a certificate, make sure you sign each and every executable; not only `myApp.exe` / `nw.exe` but also any `.exe`s your app spawns as well as any executables any of your node_modules dependencies spawn (which aren't already signed by the maintainers). If you were to use the [node-webkit-updater module](https://github.com/edjafarov/node-webkit-updater/), for example, it contains an `unsignedunzip.exe`. Make sure to sign all of these before building your installer, as well as signing the installer itself.

That's all folks! I've had to figure a lot of this stuff myself by trial and error so I hope it saves you some time. If I've missed anything, feel free to let me know in a comment below.
