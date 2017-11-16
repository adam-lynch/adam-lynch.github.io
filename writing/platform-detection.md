---
date: 2016-01-26
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
---

## Platform detection in your NW.js app

:::summary

There are various reasons why you might want to detect which platform or operating system your app is currently being ran on. Your keyboard shortcuts or UI may differ per platform, you might want to store files in platform-specific directories on disk, etc. Thanks to node's [`os`](https://nodejs.org/api/os.html#os_os_platform) module, it isn't too difficult.

:::

### Which operating system?

On Mac, Linux and Windows, the following script would output `darwin`, `linux` and `win32` or `win64` respectively.

```js
var os = require('os');
console.log(os.platform());
```

The other possible return values of `os.platform()` are `freebsd` and `sunos`. Note this code can be used in either the main or renderer processes.

### Which Linux distribution?

Figuring this out is a bit more problematic. The `uname -v` command returns some information like the following if ran on Ubuntu: `#42~precise1-Ubuntu SMP Wed Aug 14 15:31:16 UTC 2013`. You could spawn this command via io.js' [`child_process`](https://nodejs.org/api/child_process.html) module or any of the countless similar modules on `npm`.

This doesn't give you much though, it's probably safest to check for and read distrubtion-specific release information files (with the io.js' [`fs`](https://nodejs.org/api/fs.html) module) which include:

| Distribution | File(s) |
|-:|-|
| Debian | `/etc/debian_release` and `/etc/debian_version` but be careful as these also exist on Ubuntu. |
| Fedora | `/etc/fedora-release` |
| Gentoo | `/etc/gentoo-release` |
| Mandrake | `/etc/mandrake-release` |
| Novell SUSE | `/etc/SUSE-release` |
| Red Hat | `/etc/redhat-release` and `/etc/redhat_version` |
| Slackware | `/etc/slackware-release` and `/etc/slackware-version` |
| Solaris / Sparc | `/etc/release` |
| Sun JDS | `/etc/sun-release` |
| UnitedLinux | `/etc/UnitedLinux-release` |
| Ubuntu | `/etc/lsb-release` and `/etc/os-release` |
| Yellow dog | `/etc/yellowdog-release` |

Keep in mind that the format of each of these files can differ. An example `/etc/lsb-release` file:

```
DISTRIB_ID=Ubuntu
DISTRIB_RELEASE=12.04
DISTRIB_CODENAME=precise
DISTRIB_DESCRIPTION="Ubuntu 12.04.3 LTS"
```

An example `/etc/os-release` file:

```
NAME="Ubuntu"
VERSION="12.04.3 LTS, Precise Pangolin"
ID=ubuntu
ID_LIKE=debian
PRETTY_NAME="Ubuntu precise (12.04.3 LTS)"
VERSION_ID="12.04"
```


### 32-bit or 64-bit architecture?

The safest way to check this is to use `os.arch()` in combination with system environment variables; the following script will output `32` or `64` depending on the architecture:

```javascript
var os = require('os');
var is64Bit = os.arch() === 'x64' || process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432');
console.log(is64Bit ? 64 : 32);
```

## Version detection

This is a bit trickier. `os.release()` returns the platform version but it is not what you'd expect it to be. It will return the actual internal (not sure if this is the right word?) operating system version. You might expect the return value to be `10.0.0` when called on Mac OSX Yosemite but it will in fact return `14.0.0`. To see the mappings between Darwin and Mac release versions, see the [*Darwin (operating system)*](http://en.wikipedia.org/wiki/Darwin_%28operating_system%29#Release_history) Wikipedia entry. 

Microsoft [provide](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724832(v=vs.85).aspx) Windows' versions but you may need to do some testing yourself to be safe as you can see both Windows 8 and Windows Server 2012 are both listed as being `9.2`. In my experience, it's safe to check against `6.2.9200` but don't take my word for it. 

`os.release()` will return whatever `uname -v` would return on Linux (e.g. `3.8.0-29-generic` on Ubuntu 12.04.3 LTS) so it's safer to read the distribution-specific release information file(s) we saw earlier.

### The finished article

The final version of our `platform.js` module looks like this:

```js
var os = require('os');

var platform = {
  isLinux: false,
  isMac: false,
  isWindows: false,
  isWindows8: false,
  version: os.release()
};


/**
 * Checks if the current platform version is greater than or equal to the desired minimum version given
 *
 * @param minimumVersion {string} E.g. 10.0.0.
 * See [the Darwin operating system Wikipedia entry](http://en.wikipedia.org/wiki/Darwin_%28operating_system%29#Release_history) for Mac - Darwin versions.
 * Also, Windows 8 >= 6.2.9200
 *
 * @returns {boolean}
 */
var isOfMinimumVersion = function(minimumVersion){
  var actualVersionPieces = platform.version.split('.'),
    pieces = minimumVersion.split('.'),
    numberOfPieces = pieces.length;

  for(var i = 0; i < numberOfPieces; i++){
    var piece = parseInt(pieces[i], 10),
      actualPiece = parseInt(actualVersionPieces[i], 10);

    if (typeof actualPiece === 'undefined') {
      break; // e.g. 13.1 passed and actual is 13.1.0
    }
    else if (actualPiece > piece) {
      break; // doesn't matter what the next bits are, the major version (or whatever) is larger
    }
    else if (actualPiece === piece) {
      continue; // to check next version piece
    }
    else {
      return false;
    }
  }

  return true; // all was ok
};


var name = os.platform();

if(name === 'darwin'){
  platform.name = 'mac';
  platform.isMac = true;
}
else if(name === 'linux'){
  platform.name = 'linux';
  platform.isLinux = true;
}
else {
  platform.name = 'windows';
  platform.isWindows = true;
  platform.isWindows8 = isOfMinimumVersion('6.2.9200');
}

platform.is64Bit = os.arch() === 'x64' || process.env.hasOwnProperty('PROCESSOR_ARCHITEW6432');

module.exports = platform;
```

Take note of our `isOfMinimumVersion` method and `isWindows8` property.

So then, from anywhere in your app you could `require` this module and use it for platform-specific code where needs be. For example:

```javascript
var platform = require('./platform');

if(platform.isMac){
  // do something
}
else if(platform.isWindows8 && platform.is64bit) {
  // do something else
}
```

### Platform-dependent styles

You may have spotted that our `platforms.js` module exports a `name` property. This is really useful for applying platform-specific styles. To achieve differing styles per platform, we'll use this `name` property to add a `platform-` class to our `body` element:

```javascript
var platform = require('./platform');
document.body.classList.add('platform-' + platform.name);
```

Note that I've used [`Element.classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList) here which [isn't supported](http://caniuse.com/#feat=classlist) by a lot of browsers people currently use. The great thing about Electron is we can ignore that. We know that it'll be fine for 100% of our app's users.

So then we can change the styling of certain elements based on the current platform. Let's say you have some nice custom button styles and you'd like them to be a bit rounder on Mac OS X. All we have to do is use this `platform-` class in our CSS:

```css
.button {
  // your custom styles
  border-radius: 3px;
}

.platform-mac .button {
  border-radius: 5px;
}
```

So any elements with the `button` class look like just like the custom buttons you designed (or grabbed from [CodePen](http://codepen.io/)) but if the `platform-mac` class exists on an ancestor, i.e. the `body` element, then the buttons' corners are a little more rounded.

You could easily go a little further and add certain classes depending on the given platform version. You could add a `platform-windows-8` class to the `body` if `platform.isWindows8` is `true` and then make the buttons' [square-cornered](https://en.wikipedia.org/wiki/Metro_(design_language)) if it exists;

```css
.button {
  // your custom styles
  border-radius: 3px;
}

.platform-mac .button {
  border-radius: 5px;
}

.platform-windows-8 .button {
  border-radius: 0;
}
```

That's it! Feel free to take this, use it, abuse it, build on top of it, or whatever you'd like. Go wild.
