---
date: 2015-07-28
summary: JetBrains IDEs are the best. IntelliJ, Android Studio, PHPStorm, PyCharm, and so on. I use IntelliJ Ultimate myself, which is kind of like all of their IDEs in one. One of the things I love about any JetBrains…
original:
  blogLink: https://engineroom.teamwork.com
  blogName: Teamwork's Engine Room
  url: https://engineroom.teamwork.com/using-cygwins-bash-terminal-in-a-jetbrains-ide-d22dd71b52b4
tags:
  - jetbrains
  - cygwin
  - ide
  - terminal
  - babun
---

## Using Cygwin’s bash terminal in a JetBrains IDE

[JetBrains](https://www.jetbrains.com) IDEs are the best. [IntelliJ](https://www.jetbrains.com/idea/), [Android Studio](https://developer.android.com/sdk/index.html), [PHPStorm](https://www.jetbrains.com/phpstorm/), [PyCharm](https://www.jetbrains.com/pycharm/), and so on. I use [IntelliJ Ultimate](https://www.jetbrains.com/idea/features/editions_comparison_matrix.html) myself, which is kind of like all of their IDEs in one. One of the things I love about any JetBrains IDE is the built-in terminal. It looks really good, supports multiple tabs, painless copying and pasting (yeah, even with `ctrl`+`v` on Windows), loads of history, and more.

![typing at 100 chars per second](/images/blog-content/using-cygwins-bash-terminal-in-a-jetbrains-ide/typing.gif)

On Windows, it’s way above and beyond poor old `cmd`. Mac OS X already has a lovely terminal but I never find myself using it. It's nice to be able to quickly switch between writing code and executing commands when the terminal is right there in the IDE. Especially because I normally use IntelliJ in full-screen mode. I've even added some extra key mappings to switch to / from the terminal I'm already used to using on the Web for Chrome's DevTools; `ctrl` + `shift` + `j` on Windows and `cmd` + `alt` + `j` on Mac.

#### Cygwin

If you’re on Windows, you might want to go a step further and have access to typical Linux commands like `ls`, `grep`, etc. [Cygwin](https://www.cygwin.com/) is "a large collection of GNU and Open Source tools which provide functionality similar to a Linux distribution on Windows". You could install it and use its `mintty.exe` terminal which gives you access to these commands. It's not a bad terminal. You could even install Cygwin in a slightly risky way which tacks support for these commands onto `cmd`. It's not self-contained though and could cause problems.

#### Babun

[Babun](http://babun.github.io/) gives you a pre-configured Cygwin (so the install steps are much simpler) plus a good few extras including syntax highlighting, git, auto-updates, etc. When running Babun, you’re actually just running Cygwin’s `mintty.exe`. I personally use Babun because it supports everything needed for our Vagrant setup out of the box. Going back to a separate terminal would be painful at this point though.

#### Custom shells in a JetBrains IDE

:::figure using-cygwins-bash-terminal-in-a-jetbrains-ide/settings.jpg The terminal settings section
:::

Click _File_ then _Settings_ and search for “terminal”. Change the _Shell path_ to `C:\Users\YOUR-USERNAME\.babun\cygwin\bin\bash.exe` if you're using Babun. Cygwin users should use `C:\cygwin\bin\bash.exe` or similar, depending on where you've it installed. Click _Ok_, open a new terminal (tab) and try running `ls -l`. Tada!

#### pwd?

Hold on… you might notice you’re in the wrong directory now. The terminal opened in `C:\Users\YOUR-USERNAME\` instead of opening at the root of the current project like it typically would with the default shell. This would drive me mad, especially when switching projects or opening more terminal tabs. To fix this, open up `C:\Users\YOUR-USERNAME\.babun\cygwin\etc\bash.bashrc` for Babun, `C:\cygwin\etc\bash.bashrc` (or similar) for Cygwin, and add a new line to the end; `cd $OLDPWD`. Now, you're brought to the current project's room every time you open the terminal or another terminal tab. Great!

![* acts cool *](/images/blog-content/using-cygwins-bash-terminal-in-a-jetbrains-ide/spray.gif)

There isn’t that much to it but it took a bit of time and far too many tabs to figure this out. Hopefully, this post will save someone out there some time and effort in the future.
