---
date: 2016-01-26
summary: Yes, NW.js does support transparency, albeit it is disabled by default. One way to enable transparency is to use the transparency property to your application's manifest like this...
original:
  blogLink: https://www.packtpub.com/books/content/blogs
  blogName: Packt books
  url: https://www.packtpub.com/books/content/transparency-and-nwjs
tags:
  - node-webkit
  - desktop
  - javascript
  - platform
  - linux
  - mac
  - windows
  - development
---

## Transparency and NW.js

Yes, NW.js does support transparency, albeit it is disabled by default. One way to enable transparency is to use the transparency property to your application's manifest like this:

```json
{
  "name": "my-app",
  "main": "index.html",
  "description": "My app",
  "version": "0.0.1",
  "window": {
    "transparent": true
  }
}
```

Transparency will then be enabled for the main window of your application from the start. Now, it's play time. Try giving a page's body a transparent or semi-transparent background color and any children an opaque background color in your CSS like this:

```css
body {
  background:transparent;//orbackground:rgba(255, 255, 255, 0.5);
}

body > * {
  background:#fff;
}
```

I could spend all day doing this.

### Programmatically enabling transparency

The transparent option can also be passed when creating a new window:

```javascript
var gui = require('nw.gui');
var newWindow = newgui.Window.open('other.html', {
  position: 'center',
  width: 600,
  height: 800,
  transparent: true
});
newWindow.show();
```

Whether you're working with the current window or another window you've just spawned, transparency can be toggled programmatically per window on the fly thanks to the Window API:

```javascript
  newWindow.setTransparent(true);
  console.log(newWindow.isTransparent); // true
```

The window's `setTransparent` method allows you to enable or disable transparency and its `isTransparent` property contains a Boolean indicating if it's enabled right now.

### Support

Unfortunately, there are always exceptions. Transparency isn't supported at all on Windows XP or earlier. In some cases it might not work on later Windows versions, including when accessing the machine via Microsoft Remote Desktop or with some unusual themes or configurations.

On Linux, transparency is supported if the window manager supports compositing. Aside from this, you'll also need to start your application with a couple of arguments. These can be set in your app's manifest under chromium-args:

```json
{
  "name": "my-app",
  "main": "index.html",
  "description": "My app",
  "version": "0.0.1",
  "window": {
    "transparent": true
  },
  "chromium-args": "--enable-transparent-visuals --disable-gpu"
}
```

### Tips and noteworthy side-effects

It's best to make your app frameless if it will be semi-transparent. Otherwise it will look a bit strange. This would depend on your use case of course. Strangely, enabling transparency for a window on Mac OS X will make its frame and toolbar transparent:

:::figure transparency-and-nwjs/transparent-window-frame.png Screenshot of a transparent window frame on Mac OS X 

Between the community and developers behind NW.js, there isn't certainty whether or not windows with transparency enabled should have a shadow like typically windows do. At the time of writing, if transparency is enabled in your manifest for example, your window will not have a shadow, even if all its content is completely opaque.

### Click-through

NW.js even supports clicking through your transparent app to stuff behind it on your desktop, for example. This is enabled by adding a couple of runtime arguments to your chromium-args in your manifest. Namely --disable-gpu and --force-cpu-draw:

```json
{
  "name": "my-app",
  "main": "index.html",
  "description": "My app",
  "version": "0.0.1",
  "window": {
      "transparent": true
  },
  "chromium-args": "--disable-gpu --force-cpu-draw"
}
```

As of right now, this is only supported on Mac OS X and Windows. It only works with non-resizable frameless windows, although there may be exceptions depending on the operating system.

One other thing to note is that click-through will only be possible on areas of your app that are completely transparent. If the target element of the click or an ancestor has a background color, even if it's 1% opaque in the alpha channel, the click will not go through your application to whatever is behind it.
