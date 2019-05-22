---
date: 2015-12-18
summary: The NW.js GUI library provides an "App" API, which contains a variety of methods and properties, some of which are essential to pretty much any app, and some have more obscure use cases. You can access the API as follows...  
original:
  blogLink: https://www.packtpub.com/books/content/blogs
  blogName: Packt books
  url: https://www.packtpub.com/books/content/nwjs-app-and-shortcut-apis
tags:
  - node-webkit
  - desktop
  - javascript
  - app
  - shortcut
  - development
---

## NW.js: The App and Shortcut APIs

The NW.js GUI library provides an `App` API, which contains a variety of methods and properties, some of which are essential to pretty much any app, and some have more obscure use cases. You can access the API as follows:

```javascript
var gui = require('nw.gui');
gui.App.quit();
```

As you can see from the example, the App API contains a quit method, which will kill your application. `gui.App.argv`, `gui.App.dataPath`, and `gui.App.manifest` are properties containing an array of arguments passed to your application when it was executed, an object representing your app's JSON manifest, and the application's data path in user's directory. `gui.App.dataPath` is typically a directory with the name you gave as the name property in your app manifest, located in the current user's `AppData/Local/` directory on Windows, `~/Library/Application Support/` on Mac OS X, or in `~/.config/` on Linux.

```javascript
var gui = require('nw.gui');
gui.App.on('open', function(command){
  gui.App.closeAllWindows();
});
```

The App API gives us two events we can listen for: open and reopen. The open event is fired when someone opens a file with your application, i.e. from the command line like: `myapp a.txt`. The function passed will receive the entire command (`myapp a.txt`) as the only argument. The reopen is exclusive to Mac OS X and is fired when the user clicks the dock icon for your app while it is already running. Also used in the example is the `gui.App.closeAllWindows` method which could come in handy if your app contains multiple windows.

Other methods out of scope for this post include ones for getting and setting proxy configuration, editing cross-origin policies, setting where crash dumps get written to when NW.js itself crashes, and forcing a crash in the browser or renderer.

## Keyboard shortcuts

This is also where you'll find methods to add or remove "global hot keys", i.e. keyboard shortcuts. To add a shortcut, you could do like this:

```javascript
var gui = require('nw.gui');
var shortcut = newgui.Shortcut({
  key: "V",
  active: function() {
    console.log("Shortcut: " + this.key + " pressed.");
  },
  failed: function(msg) {
    // Error adding / parsing the key
    console.log(msg);
  }
});
gui.App.registerGlobalHotKey(shortcut);
```

With the above code, any time the user presses the A key, the active callback is called. We create a new Shortcut instance (another piece of the the NW.js' GUI library) and pass it to `gui.App.registerGlobalHotKey`. The failed callback is called if there was a problem adding or parsing the key option. This is useful for development because there are some peculiar restrictions on what can be passed as the key option. The key option has to contain exactly one "key" (no more, no less) and can contain zero or more "modifiers". A "key" is one of the following: `A-Z`, `0-9`, `Comma`, `Period`, `Home`, `End`, `PageUp`, `PageDown`, `Insert`, `Delete`, Arrow keys (`Up`, `Down`, `Left`, `Right`) and the Media Keys (`MediaNextTrack`, `MediaPlayPause`, `MediaPrevTrack`, `MediaStop`). The supported "modifiers" are: `Ctrl`, `Alt`, and `Shift`. Strangely, it was decided that on Mac OS X Ctrl would bind to Command instead, intentionally. I find this very strange as it seems you cannot bind any shortcuts which use the ctrl key on a Mac because of this. Hopefully in a future version Ctrl will map to Ctrl, Command will be supported, and it would be up to the user to check the current platform and bind to the correct keys accordingly.

For clarity, here are a few example key bindings: 

- `A`: Valid. 
- `A+B`: Fails; you're not allowed to have multiple "keys". 
- `Alt+Shift+T`: Valid. 
- `Ctrl+B`: Valid but maps to `Command+B` on Mac OS X.

It's not recommended to bind a shortcut to just one "key" like the A key as it'll block usage of that key for other applications while your app is running or until your app "unregisters" it.

### Unbinding a shortcut

The API is pretty symmetric in that you can call `gui.App.unregisterGlobalHotKey` to remove or unbind a shortcut. You do have to pass the Shortcut instance again though which is a bit awkward. Thankfully, you can also pass a new Shortcut instance with just the key option as a workaround. So either of the last two lines here would work:

```javascript
var gui = require('nw.gui');
var shortcut = newgui.Shortcut({
  key: 'V',
  active: function() {
    console.log('Shortcut: ' + this.key + ' pressed.');
  },
  failed: function(msg) {
    console.log(msg);
  }
});
gui.App.registerGlobalHotKey(shortcut);

gui.App.unregisterGlobalHotKey(shortcut); // option 1
gui.App.unregisterGlobalHotKey({key: 'V'}); // option 2
```

### Events

The Shortcut instance emits active and failed events as well as accepting them as options. You could either or both if you'd like. Here's an unrealistic example:

```javascript
var gui = require('nw.gui');
var shortcut = newgui.Shortcut({
  key: 'V',
  active: function() {
    console.log('ACTIVE: Constructor option');
  },
  failed : function(msg) {
    console.log('FAILED (Constructor option): ' + msg);
  }
});

shortcut.on('active', function(){
  console.log('ACTIVE: Event listener');
});

shortcut.on('failed', function(msg){
  console.log('FAILED (Event listener): ' + msg);
});

gui.App.registerGlobalHotKey(shortcut);
```

### System-wide

These shortcuts are system-wide and will be called even if your app isn't focused. If you'd like to have shortcuts which do something when your app is focused, then you could check if the app is focused in the active callback using the Window API we'll cover later.

### Summary and Alternative

This article provides a quick look at the App API, but if you really need to bind to keys, which aren't supported by this API, or if you can't use this API because your app will be used in both NW.js and on the Web, then you could use a JavaScript library to bind your shortcuts. These will not be "global" or "system-wide" though.
