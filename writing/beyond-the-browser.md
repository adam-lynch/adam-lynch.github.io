---
date: 2017-03-21
description: I started out as a web developer, and that’s now one part of what I do as a full-stack developer, but never had I imagined I’d create things for the desktop. I love the web. I love how altruistic our community is, how it embraces open-source, testing and pushing the envelope. I love discovering beautiful websites and powerful apps. When I was first tasked with creating a desktop app, I was apprehensive and intimidated. It seemed like it would be difficult, or at least… different.
original:
  blogLink: https://www.smashingmagazine.com/
  blogName: Smashing Magazine
  url: https://www.smashingmagazine.com/2017/03/beyond-browser-web-desktop-apps/
tags:
  - node-webkit
  - electron
  - javascript
---

# Beyond The Browser: From Web Apps To Desktop Apps

<p>I started out as a web developer, and that&#8217;s now one part of what I do as a full-stack developer, but never had I imagined I&#8217;d create things for the desktop. I love the web. I love how altruistic our community is, how it embraces open-source, testing and pushing the envelope. I love discovering beautiful websites and powerful apps. When I was first tasked with creating a desktop app, I was apprehensive and intimidated. It seemed like it would be difficult, or at least… different.</p>
<p>It&#8217;s not an attractive prospect, right? Would you have to learn a new language or three? Imagine an archaic, alien workflow, with ancient tooling, and none of those things you love about the web. How would your career be affected?</p>
<p>OK, take a breath. The reality is that, as a web developer, not only do you already possess all of the skills to make great modern desktop apps, but thanks to powerful new APIs at your disposal, the desktop is actually where your skills can be leveraged the most.</p>
<p>In this article, we&#8217;ll look at the development of desktop applications using <a href="http://nwjs.io/">NW.js</a><sup class="po" id="note-1"><a href="#1">1</a></sup> and <a href="http://electron.atom.io/">Electron</a><sup class="po" id="note-2"><a href="#2">2</a></sup>, the ups and downs of building one and living with one, using one code base for the desktop and the web, and more.</p>
<h3  id="why">Why? <a href="#why" aria-label="Link to section 'Why?'" class="sr hsl">Link</a></h3>
<p>First of all, why would anyone create a desktop app? Any existing web app (as opposed to a website, if you believe in the distinction) is probably suited to becoming a desktop app. You could build a desktop app around any web app that would benefit from integration in the user&#8217;s system; think native notifications, launching on startup, interacting with files, etc. Some users simply prefer having certain apps there permanently on their machine, accessible whether they have a connection or not.</p>
<p>Maybe you&#8217;ve an idea that would only work as a desktop app; some things simply aren&#8217;t possible with a web app (at least yet, but more about that in a little bit). You could create a self-contained utility app for internal company use, without requiring anyone to install anything other than your app (because Node.js in built-in). Maybe you&#8217;ve an idea for the Mac App Store. Maybe it would simply be a fun side project.</p>
<p>It&#8217;s hard to sum up why you should consider creating a desktop app because there are so many kinds of apps you could create. It really depends on what you&#8217;d like to achieve, how advantageous you find the additional APIs, and how much offline usage would enhance the experience for your users. For my team, it was a no-brainer because we were building a <a href="https://teamwork.com/chat">chat application</a><sup class="po" id="note-7"><a href="#7">7</a></sup>. On the other hand, a connection-dependent desktop app that doesn&#8217;t really have any desktop integration should be a web app and a web app alone. It wouldn&#8217;t be fair to expect a user to download your app (which includes a browser of its own and Node.js) when they wouldn&#8217;t get any more value from it than from visiting a URL of yours in their favorite browser.</p>
<p>Instead of describing the desktop app you personally should build and why, I&#8217;m hoping to spark an idea or at least spark your interest in this article. Read on to see just how easy it is to create powerful desktop apps using web technology and what that can afford you over (or alongside of) creating a web app.</p>
<h3  id="nw-js">NW.js <a href="#nw-js" aria-label="Link to section 'NW.js'" class="sr hsl">Link</a></h3>
<p>Desktop applications have been around a long time but you don&#8217;t have all day, so let&#8217;s skip some history and begin in Shanghai, 2011. Roger Wang, of Intel&#8217;s Open Source Technology Center, created node-webkit; a proof-of-concept Node.js module that allowed the user to spawn a WebKit browser window and use Node.js modules within <code>&lt;script&gt;</code> tags.</p>
<p>After some progress and a switch from WebKit to Chromium (the open-source project Google Chrome is based on), an intern named Cheng Zhao joined the project. It was soon realized that an app runtime based on Node.js and Chromium would make a nice framework for building desktop apps. The project went on be quite popular.</p>
<p><em>Note</em>: node-webkit was later renamed NW.js to make it a bit more generic because it no longer used Node.js or WebKit. Instead of Node.js, it was based on io.js (the Node.js fork) at the time, and Chromium had moved on from WebKit to its own fork, Blink.</p>
<p>So, if you were to download an NW.js app, you would actually be downloading Chromium, plus Node.js, plus the actual app code. Not only does this mean a desktop app can be created using HTML, CSS and JavaScript, but the app would also have access to all of the Node.js APIs (to read and write to disk, for example), and the end user wouldn&#8217;t know any better. That&#8217;s pretty powerful, but how does it work? Well, first let&#8217;s take a look at Chromium.</p>
<figure><a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/chromiumDiagram-large-opt.png"><img src="https://www.smashingmagazine.com/wp-content/uploads/2017/01/chromiumDiagram-preview-opt.png" alt="Chromium diagram" width="780" height="698" /></a><sup class="po" id="note-8"><a href="#8">8</a></sup><br />
<figcaption>A rough diagram of Chromium&#8217;s internals. (Note: this diagram is intentionally very simple; it&#8217;s a lot more complex than this.) (<a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/chromiumDiagram-large-opt.png">View large version</a><sup class="po" id="note-9"><a href="#9">9</a></sup>)</figcaption>
</figure>
<p>There is a main background process, and each tab gets its own process. You might have seen that Google Chrome always has at least two processes in Windows&#8217; task manager or macOS&#8217; activity monitor. I haven&#8217;t even attempted to arrange the contents of the main process here, but it contains the Blink rendering engine, the V8 JavaScript engine (which is what Node.js is built on, too, by the way) and some platform APIs that abstract native APIs. Each isolated tab or renderer process has access to the JavaScript engine, CSS parser and so on, but it is completely separate to the main process for fault tolerance. Renderer processes interact with the main process through interprocess communication (IPC).</p>
<figure><a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/nwjsDiagram-large-opt.png"><img src="https://www.smashingmagazine.com/wp-content/uploads/2017/01/nwjsDiagram-preview-opt.png" alt="NW.js diagram" width="780" height="698" /></a><sup class="po" id="note-10"><a href="#10">10</a></sup><br />
<figcaption>A rough diagram of an NW.js app&#8217;s internals (<a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/nwjsDiagram-large-opt.png">View large version</a><sup class="po" id="note-11"><a href="#11">11</a></sup>)</figcaption>
</figure>
<p>This is roughly what an NW.js app looks like. It&#8217;s basically the same, except that each window has access to Node.js now as well. So, you have access to the DOM and you can require other scripts, node modules you&#8217;ve installed from npm, or built-in modules provided by NW.js. By default, your app has one window, and from there you can spawn other windows.</p>
<p>Creating an app is really easy. All you need is an HTML file and a <code>package.json</code>, like you would have when working with Node.js. You can create a default one by running <code>npm init --yes</code>. Typically, a <code>package.json</code> would point a JavaScript file as the &#8220;main&#8221; file for the module (i.e. using the <code>main</code> property), but with NW.js you need to edit the <code>main</code> property to point to your HTML file.</p>
<pre><code class="language-javascript">{
  "name": "example-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.html",
  "scripts": {
    "test": "echo \"Error: no test specified\" &amp;&amp; exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
</code></pre>
<pre><code class="language-markup">&lt;!-- index.html --&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Example app&lt;/title&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello, world!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>
<p>Once you install the official <code>nw</code> package from npm (by running <code>npm install -g nw</code>), you can run <code>nw .</code> within the project directory to launch your app.</p>
<figure><a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/nwjsHelloWorld-large-opt.png"><img src="https://www.smashingmagazine.com/wp-content/uploads/2017/01/nwjsHelloWorld-preview-opt.png" alt="Example app screenshot" width="780" height="619" /></a><sup class="po" id="note-12"><a href="#12">12</a></sup><br />
<figcaption>A screenshot of our example NW.js app (<a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/nwjsHelloWorld-large-opt.png">View large version</a><sup class="po" id="note-13"><a href="#13">13</a></sup>)</figcaption>
</figure>
<p>It&#8217;s as easy as that. So, what happened here was that NW.js opened the initial window, loading your HTML file. I know this doesn&#8217;t look like much, but it&#8217;s up to you add some markup and styles, just like you would in a web app.</p>
<p>You could drop the window bar and chrome if you like, or create your own custom frame. You could have semi to fully transparent windows, hidden windows and more. I took this a bit further recently and <a href="http://engineroom.teamwork.com/resurrecting-clippy/">resurrected Clippy</a><sup class="po" id="note-14"><a href="#14">14</a></sup> using NW.js. There&#8217;s something weirdly satisfying about seeing Clippy on macOS or Windows 10.</p>
<figure><a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/clippy-large-opt.png"><img src="https://www.smashingmagazine.com/wp-content/uploads/2017/01/clippy-preview-opt.png" alt="Screenshot of clippy.desktop on macOS" width="780" height="316" /></a><sup class="po" id="note-15"><a href="#15">15</a></sup><br />
<figcaption>A screenshot of clippy.desktop on macOS. (<a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/clippy-large-opt.png">View large version</a><sup class="po" id="note-16"><a href="#16">16</a></sup>)</figcaption>
</figure>
<p>So, you get to write HTML, CSS and JavaScript. You can use Node.js to read and write to disk, execute system commands, spawn other executables and more. Hypothetically, you could build a multiplayer roulette game over WebRTC that deletes some of the users&#8217; files randomly, if you wanted.</p>
<figure><a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/moduleCounts-large-opt.png"><img src="https://www.smashingmagazine.com/wp-content/uploads/2017/01/moduleCounts-preview-opt.png" alt="Bar graph showing the number of modules per major package manager" width="780" height="479" /></a><sup class="po" id="note-17"><a href="#17">17</a></sup><br />
<figcaption>Bar graph showing the number of modules per major package manager. (Source: <a href="http://modulecounts.com/">Module Counts</a><sup class="po" id="note-18"><a href="#18">18</a></sup>) (<a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/moduleCounts-large-opt.png">View large version</a><sup class="po" id="note-19"><a href="#19">19</a></sup>)</figcaption>
</figure>
<p>You get access not only to Node.js&#8217; APIs but to all of npm, which has over 350,000 modules now. For example, <a href="https://github.com/Teamwork/node-auto-launch">auto-launch</a><sup class="po" id="note-20"><a href="#20">20</a></sup> is an open-source module we created at <a href="https://www.teamwork.com/">Teamwork.com</a><sup class="po" id="note-21"><a href="#21">21</a></sup> to launch an NW.js or Electron app on startup.</p>
<p>Node.js also has what&#8217;s known as &#8220;native modules,&#8221; which, if you really need to do something a bit lower level, allows you to create modules in C or C++.</p>
<p>To top it all off, NW.js exposes APIs that effectively wrap native APIs, allowing you to integrate closely with the desktop environment. You can have a tray icon, open a file or URL in the default system application, and a lot lot more. All you need to do to trigger a notification is use the HTML5 notification API:</p>
<pre><code class="language-javascript">new Notification('Hello', {
  body: 'world'
});
</code></pre>
<section>
<div class="oa_zone--ad icad" id="cad-middle" data-ad-name="Content Ad Middle" data-ad-zone="110" data-ad-media="all"></div>
</section>
<h3  id="electron">Electron <a href="#electron" aria-label="Link to section 'Electron'" class="sr hsl">Link</a></h3>
<p>You might recognize GitHub&#8217;s text editor, Atom, below. Whether you use it or not, Atom was a game-changer for desktop apps. GitHub started development of Atom in 2013, soon recruited Cheng Zhao, and forked node-webkit as its base, which it later open-sourced under the name atom-shell.</p>
<figure><a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/atom-large-opt.png"><img src="https://www.smashingmagazine.com/wp-content/uploads/2017/01/atom-preview-opt.png" alt="Atom screenshot" width="780" height="459" /></a><sup class="po" id="note-22"><a href="#22">22</a></sup><br />
<figcaption>A screenshot of Atom, GitHub&#8217;s text editor (<a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/atom-large-opt.png">View large version</a><sup class="po" id="note-23"><a href="#23">23</a></sup>)</figcaption>
</figure>
<p><em>Note</em>: It&#8217;s disputed whether Electron is a fork of node-webkit or whether everything was rewritten from scratch. Either way, it&#8217;s effectively a fork for the end user because the APIs were almost identical.</p>
<p>In making Atom, GitHub improved on the formula and ironed out a lot of the bugs. In 2015, atom-shell was renamed Electron. Since then it has hit version 1.0, and with GitHub pushing it, it has really taken off.</p>
<figure><a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/logos-large-opt.png"><img src="https://www.smashingmagazine.com/wp-content/uploads/2017/01/logos-preview-opt.png" alt="Logos of projects that use Electron" width="780" height="92" /></a><sup class="po" id="note-24"><a href="#24">24</a></sup><br />
<figcaption>Logos of projects that use Electron (<a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/logos-large-opt.png">View large version</a><sup class="po" id="note-25"><a href="#25">25</a></sup>)</figcaption>
</figure>
<p>As well as Atom, other notable projects built with Electron include Slack, Visual Studio Code, Brave, HyperTerm and Nylas, which is really doing some cutting-edge stuff with it. Mozilla Tofino is an interesting one, too. It was an internal project at Mozilla (the company behind Firefox), with the aim of radically improving web browsers. Yeah, a team within Mozilla chose Electron (which is based on Chromium) for this experiment.</p>
<h3  id="how-does-it-differ">How Does It Differ? <a href="#how-does-it-differ" aria-label="Link to section 'How Does It Differ?'" class="sr hsl">Link</a></h3>
<p>But how is it different from NW.js? First of all, Electron is less browser-oriented than NW.js. The entry point for an Electron app is a script that runs in the main process.</p>
<figure><a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/electronDiagram-large-opt.png"><img src="https://www.smashingmagazine.com/wp-content/uploads/2017/01/electronDiagram-preview-opt-1.png" alt="Electron architecture diagram" width="780" height="698" /></a><sup class="po" id="note-26"><a href="#26">26</a></sup><br />
<figcaption>A rough diagram of an Electron app&#8217;s internals (<a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/electronDiagram-large-opt.png">View large version</a><sup class="po" id="note-27"><a href="#27">27</a></sup>)</figcaption>
</figure>
<p>The Electron team patched Chromium to allow for the embedding of multiple JavaScript engines that could run at the same time. So, when Chromium releases a new version, they don&#8217;t have to do anything.</p>
<p><em>Note</em>: NW.js hooks into Chromium a little differently, and this was often blamed on the fact NW.js wasn&#8217;t quite as good at keeping up with Chromium as Electron was. However, throughout 2016, NW.js has released a new version within 24 hours of each major Chromium release, which the team attributes to an organizational shift.</p>
<p>Back to the main process. Your app hasn&#8217;t any window by default, but you can open as many windows as you&#8217;d like from the main process, each having its own renderer process, just like NW.js.</p>
<p>So, yeah, the minimum you need for an Electron app is a main JavaScript file (which we&#8217;ll leave empty for now) and a <code>package.json</code> that points to it. Then, all you need to do is <code>npm install --save-dev electron</code> and run <code>electron .</code> to launch your app.</p>
<pre><code class="language-javascript"><span class="token punctuation">{
  "name": "example-app",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" &amp;&amp; exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
</span></code></pre>
<pre><code class="language-javascript">// main.js, which is empty
</code></pre>
<p>Not much will happen, though, because your app hasn&#8217;t any window by default. You can open as many windows as you&#8217;d like from the main process, each having its own renderer process, just like they&#8217;d have in an NW.js app.</p>
<pre><code class="language-javascript">// main.js
const {app, BrowserWindow} = require('electron');
let mainWindow;

app.on('ready', () =&gt; {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 400
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
});
</code></pre>
<pre><code class="language-markup">&lt;!-- index.html --&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Example app&lt;/title&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Hello, world!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;
</code></pre>
<p>You could load a remote URL in this window, but typically you&#8217;d create a local HTML file and load that. Ta-da!</p>
<figure><a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/electronHelloWorld-large-opt.png"><img src="https://www.smashingmagazine.com/wp-content/uploads/2017/01/electronHelloWorld-preview-opt.png" alt="Screenshot of example Electron app" width="780" height="625" /></a><sup class="po" id="note-28"><a href="#28">28</a></sup><br />
<figcaption>A screenshot of our example Electron app (<a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/electronHelloWorld-large-opt.png">View large version</a><sup class="po" id="note-29"><a href="#29">29</a></sup>)</figcaption>
</figure>
<p>Of the built-in modules Electron provides, like the <code>app</code> or <code>BrowserWindow</code> module used in the previous example, most can only be used in either the main or a renderer process. For example, the main process is where, and only where, you can manage your windows, automatic updates and more. You might want a click of a button to trigger something in your main process, though, so Electron comes with built-in methods for IPC. You can basically emit arbitrary events and listen for them on the other side. In this case, you&#8217;d catch the <code>click</code> event in the renderer process, emit an event over IPC to the main process, catch it in the main process and finally perform the action.</p>
<p>OK, so Electron has distinct processes, and you have to organize your app slightly differently, but that&#8217;s not a big deal. Why are people using Electron instead of NW.js? Well, there&#8217;s mindshare. So many related tools and modules are out there as a result of its popularity. The documentation is better. Most importantly, it has fewer bugs and superior APIs.</p>
<p>Electron&#8217;s documentation really is amazing, though — that&#8217;s worth emphasizing. Take the <a href="https://github.com/electron/electron-api-demos">Electron API Demos app</a><sup class="po" id="note-30"><a href="#30">30</a></sup>. It&#8217;s an Electron app that interactively demonstrates what you can do with Electron&#8217;s APIs. Not only is the API described and sample code provided for creating a new window, for example, but clicking a button will actually execute the code and a new window will open.</p>
<figure><a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/apiDemosApp-large-opt.png"><img src="https://www.smashingmagazine.com/wp-content/uploads/2017/01/apiDemosApp-preview-opt.png" alt="A screenshot of the Electron API Demos app" width="780" height="377" /></a><sup class="po" id="note-31"><a href="#31">31</a></sup><br />
<figcaption>A screenshot of the Electron API Demos app (<a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/apiDemosApp-large-opt.png">View large version</a><sup class="po" id="note-32"><a href="#32">32</a></sup>)</figcaption>
</figure>
<p>If you submit an issue via Electron&#8217;s bug tracker, you&#8217;ll get a response within a couple of days. I&#8217;ve seen three-year-old NW.js bugs, although I don&#8217;t hold it against them. It&#8217;s tough when an open-source project is written in languages drastically different from the languages known by its users. NW.js and Electron are written mostly in C++ (and a tiny bit of Objective C++) but used by people who write JavaScript. I&#8217;m extremely grateful for what NW.js has given us.</p>
<p>Electron ironed out a few of the flaws in the NW.js APIs. For example, you can bind global keyboard shortcuts, which would be caught even if your app isn&#8217;t focused. An example API flaw I ran into was that binding to <code>Control + Shift + A</code> in an NW.js app did what you would expect on Windows, but actually bound to <code>Command + Shift + A</code> on a Mac. This was intentional but really weird. There was no way to bind to the <code>Control</code> key. Also, binding to the <code>Command</code> key did bind to the <code>Command</code> key but the <code>Windows</code> key on Windows and Linux as well. The Electron team spotted these problems (when adding shortcuts to Atom I assume) and quickly updated their globalShortcut API so both of these cases work as you&#8217;d expect. To be fair, NW.js has since fixed the former but not the latter.</p>
<p>There are a few other differences. For instance, in recent NW.js versions, notifications that were previously native are now Chrome-style ones. These don&#8217;t go into the notification centre on Mac OS X or Windows 10, but there are modules on npm that you could use as a workaround if you&#8217;d like. If you want to do something interesting with audio or video, use Electron, because some codecs don&#8217;t work out of the box with NW.js.</p>
<p>Electron has added a few new APIs as well, more desktop integration, and it has built-in support for automatic updates, but I&#8217;ll cover that later.</p>
<h3  id="but-how-does-it-feel">But How Does It Feel? <a href="#but-how-does-it-feel" aria-label="Link to section 'But How Does It Feel?'" class="sr hsl">Link</a></h3>
<p>It feels fine. Sure, it&#8217;s not native. Most desktop apps these days don&#8217;t look like Windows Explorer or Finder anyway, so users won&#8217;t mind or realize that HTML is behind your user interface. You can make it feel more native if you&#8217;d like, but I&#8217;m not convinced it will make the experience any better. For example, you could prevent the cursor from turning to a hand when the user hovers over a button. That&#8217;s how a native desktop app would act, but is that better? There are also projects out there like <a href="http://photonkit.com/">Photon Kit</a><sup class="po" id="note-33"><a href="#33">33</a></sup>, which is basically a CSS framework like Bootstrap, but for macOS-style components.</p>
<figure><a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/photon-large-opt.png"><img src="https://www.smashingmagazine.com/wp-content/uploads/2017/01/photon-preview-opt.png" alt="Photon app example screenshot" width="780" height="" /></a><sup class="po" id="note-34"><a href="#34">34</a></sup><br />
<figcaption>A screenshot of an example Electron app made with Photon (<a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/photon-large-opt.png">View large version</a><sup class="po" id="note-35"><a href="#35">35</a></sup>)</figcaption>
</figure>
<h3  id="performance">Performance <a href="#performance" aria-label="Link to section 'Performance'" class="sr hsl">Link</a></h3>
<p>What about performance? Is it slow or laggy? Well, your app is essentially a web app. It&#8217;ll perform pretty much like a web app in Google Chrome. You can create a performant app or a sluggish one, but that&#8217;s fine because you already have the skills to analyze and improve performance. One of the best things about your app being based on Chromium is that you get its DevTools. You can debug within the app or remotely, and the Electron team has even created a DevTools extension named <a href="http://electron.atom.io/devtron/">Devtron</a><sup class="po" id="note-36"><a href="#36">36</a></sup> to monitor some Electron-specific stuff.</p>
<p>Your desktop app can be more performant than a web app, though. One thing you could do is create a worker window, a hidden window that you use to perform any expensive work. Because it&#8217;s an isolated process, any computation or processing going on in that window won&#8217;t affect rendering, scrolling or anything else in your visible window(s).</p>
<p>Keep in mind that you can always spawn system commands, spawn executables or drop down to native code if you really need to (you won&#8217;t).</p>
<h3  id="distribution">Distribution <a href="#distribution" aria-label="Link to section 'Distribution'" class="sr hsl">Link</a></h3>
<p>Both NW.js and Electron support a wide array of platforms, including Windows, Mac and Linux. Electron doesn&#8217;t support Windows XP or Vista; NW.js does. Getting an NW.js app into the Mac App Store is a bit tricky; you&#8217;ll have to jump through a few hoops. Electron, on the other hand, comes with Mac App Store-compatible builds, which are just like the normal builds except that you don&#8217;t have access to some modules, such as the auto-updater module (which is fine because your app will update via the Mac App Store anyway).</p>
<p>Electron even supports ARM builds, so your app can run on a Chromebook or Raspberry Pi. Finally, Google may be <a href="http://blog.chromium.org/2016/08/from-chrome-apps-to-web.html">phasing out Chrome Packaged Apps</a><sup class="po" id="note-37"><a href="#37">37</a></sup>, but NW.js allows you to port an app over to an NW.js app and still have access the same Chromium APIs.</p>
<p>Even though 32-bit and 64-bit builds are supported, you&#8217;ll get away with 64-bit Mac and Windows apps. You will need 32-bit and 64-bit Linux apps, though, for compatibility.</p>
<p>So, let&#8217;s say that Electron has won over and you want to ship an Electron app. There&#8217;s a nice Node.js module named <a href="https://github.com/electron-userland/electron-packager">electron-packager</a><sup class="po" id="note-38"><a href="#38">38</a></sup> that helps with packing your app up into an <code>.app</code> or <code>.exe</code> file. A few similar projects exist, including interactive ones that prompt you step by step. You should use <a href="https://github.com/electron-userland/electron-builder">electron-builder</a><sup class="po" id="note-79"><a href="#79">79</a></sup><sup class="po" id="note-39"><a href="#39">39</a></sup>, though, which builds on top of electron-packager, plus a few other related modules. It generates <code>.dmg</code>s and Windows installers and takes care of the code-signing of your app for you. This is really important. Without it, your app would be labelled as untrusted by operating systems, your app could trigger anti-virus software, and Microsoft SmartScreen might try to block the user from launching your app.</p>
<p>The annoying thing about code-signing is that you have to sign your app on a Mac for Mac and on Windows for Windows. So, if you&#8217;re serious about shipping desktop apps, then you&#8217;ll need to build on multiple machines for each release.</p>
<p>This can feel a bit too manual or tedious, especially if you&#8217;re used to creating for the web. Thankfully, electron-builder was created with automation in mind. I&#8217;m talking here about continuous integration tools and services such as <a href="https://jenkins.io/">Jenkins</a><sup class="po" id="note-40"><a href="#40">40</a></sup>, <a href="http://codeship.com/">CodeShip</a><sup class="po" id="note-41"><a href="#41">41</a></sup>, <a href="https://travis-ci.org/">Travis-CI</a><sup class="po" id="note-42"><a href="#42">42</a></sup>, <a href="https://www.appveyor.com/">AppVeyor</a><sup class="po" id="note-43"><a href="#43">43</a></sup> (for Windows) and so on. These could run your desktop app build at the press of a button or at every push to GitHub, for example.</p>
<h3  id="automatic-updates">Automatic Updates <a href="#automatic-updates" aria-label="Link to section 'Automatic Updates'" class="sr hsl">Link</a></h3>
<p>NW.js doesn&#8217;t have automatic update support, but you&#8217;ll have access to all of Node.js, so you can do whatever you want. Open-source modules are out there for it, such as <a href="https://github.com/edjafarov/node-webkit-updater">node-webkit-updater</a><sup class="po" id="note-44"><a href="#44">44</a></sup>, which handles downloading and replacing your app with a newer version. You could also roll your own custom system if you wanted.</p>
<p>Electron has built-in support for automatic updates, via its <a href="http://electron.atom.io/docs/api/auto-updater/">autoUpdater</a><sup class="po" id="note-80"><a href="#80">80</a></sup><sup class="po" id="note-45"><a href="#45">45</a></sup> API. It doesn&#8217;t support Linux, first of all; instead, publishing your app to Linux package managers is recommended. This is common on Linux — don&#8217;t worry. The <code>autoUpdater</code> API is really simple; once you give it a URL, you can call the <code>checkForUpdates</code> method. It&#8217;s event-driven, so you can subscribe to the <code>update-downloaded</code> event, for example, and once it&#8217;s fired, call the <code>restartAndInstall</code> method to install the new version and restart the app. You can listen for a few other events, which you can use to tie the auto-updating functionality into your user interface nicely.</p>
<p><em>Note</em>: You can have multiple update channels if you want, such as Google Chrome and Google Chrome Canary.</p>
<p>It&#8217;s not quite as simple behind the API. It&#8217;s based on the Squirrel update framework, which differs drastically between Mac and Windows, which use the <a href="https://github.com/Squirrel/Squirrel.Mac">Squirrel.Mac</a><sup class="po" id="note-46"><a href="#46">46</a></sup> and <a href="https://github.com/Squirrel/Squirrel.Windows">Squirrel.Windows</a><sup class="po" id="note-47"><a href="#47">47</a></sup> projects, respectively.</p>
<p>The update code within your Mac Electron app is simple, but you&#8217;ll need a server (albeit a simple server). When you call the autoUpdater module&#8217;s <code>checkForUpdates</code> method, it will hit your server. What your server needs to do is return a 204 (&#8220;No Content&#8221;) if there isn&#8217;t an update; and if there is, it needs to return a 200 with a JSON containing a URL pointing to a <code>.zip</code> file. Back under the hood of your app (or the client), Squirrel.Mac will know what to do. It&#8217;ll go get that <code>.zip</code>, unzip it and fire the appropriate events.</p>
<p>There a bit more (magic) going on in your Windows app when it comes to automatic updates. You won&#8217;t need a server, but you can have one if you&#8217;d like. You could host the static (update) files somewhere, such as AWS S3, or even have them locally on your machine, which is really handy for testing. Despite the differences between Squirrel.Mac and Squirrel.Windows, a happy medium can be found; for example, having a server for both, and storing the updates on S3 or somewhere similar.</p>
<p>Squirrel.Windows has a couple of nice features over Squirrel.Mac as well. It applies updates in the background; so, when you call <code>restartAndInstall</code>, it&#8217;ll be a bit quicker because it&#8217;s ready and waiting. It also supports delta updates. Let&#8217;s say your app checks for updates and there is one newer version. A binary diff (between the currently installed app and the update) will be downloaded and applied as a patch to the current executable, instead of replacing it with a whole new app. It can even do that incrementally if you&#8217;re, say, three versions behind, but it will only do that if it&#8217;s worth it. Otherwise, if you&#8217;re, say, 15 versions behind, it will just download the latest version in its entirety instead. The great thing is that all of this is done under the hood for you. The API remains really simple. You check for updates, it will figure out the optimal method to apply the update, and it will let you know when it&#8217;s ready to go.</p>
<p><em>Note</em>: You will have to generate those binary diffs, though, and host them alongside your standard updates. Thankfully, electron-builder generates these for you, too.</p>
<p>Thanks to the Electron community, you don&#8217;t have to build your own server if you don&#8217;t want to. There are open-source projects you can use. Some allow you to <a href="https://github.com/ArekSredzki/electron-release-server">store updates on S3</a><sup class="po" id="note-48"><a href="#48">48</a></sup> or use <a href="https://github.com/GitbookIO/nuts">GitHub releases</a><sup class="po" id="note-49"><a href="#49">49</a></sup>, and some even go as far as <a href="https://github.com/ArekSredzki/electron-release-server">providing administrative dashboards</a><sup class="po" id="note-50"><a href="#50">50</a></sup> to manage the updates.</p>
<h3  id="desktop-versus-web">Desktop Versus Web <a href="#desktop-versus-web" aria-label="Link to section 'Desktop Versus Web'" class="sr hsl">Link</a></h3>
<p>So, how does making a desktop app differ from making a web app? Let&#8217;s look at a few unexpected problems or gains you might come across along the way, some unexpected side effects of APIs you&#8217;re used to using on the web, workflow pain points, maintenance woes and more.</p>
<p>Well, the first thing that comes to mind is browser lock-in. It&#8217;s like a guilty pleasure. If you&#8217;re making a desktop app exclusively, you&#8217;ll know exactly which Chromium version all of your users are on. Let your imagination run wild; you can use flexbox, ES6, pure WebSockets, WebRTC, anything you want. You can even enable experimental features in Chromium for your app (i.e. features coming down the line) or tweak settings such as your localStorage allowance. You&#8217;ll never have to deal with any cross-browser incompatibilities. This is on top of Node.js&#8217; APIs and all of npm. You can do anything.</p>
<p><em>Note</em>: You&#8217;ll still have to consider which operating system the user is running sometimes, though, but OS-sniffing is a lot more reliable and less frowned upon than browser sniffing.</p>
<h4  id="working-with-file">Working With file:// <a href="#working-with-file" aria-label="Link to section 'Working With file://'" class="sr hsl">Link</a></h4>
<p>Another interesting thing is that your app is essentially offline-first. Keep that in mind when creating your app; a user can launch your app without a network connection and your app will run; it will still load the local files. You&#8217;ll need to pay more attention to how your app behaves if the network connection is lost while it&#8217;s running. You may need to adjust your mindset.</p>
<p><em>Note</em>: You can load remote URLs if you really want, but I wouldn&#8217;t.</p>
<p>One tip I can give you here is not to trust <a href="https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine"><code>navigator.onLine</code></a><sup class="po" id="note-51"><a href="#51">51</a></sup> completely. This property returns a Boolean indicating whether or not there&#8217;s a connection, but watch out for false positives. It&#8217;ll return <code>true</code> if there&#8217;s any local connection without validating that connection. The Internet might not actually be accessible; it could be fooled by a dummy connection to a Vagrant virtual machine on your machine, etc. Instead, use Sindre Sorhus&#8217; <a href="https://github.com/sindresorhus/is-online"><code>is-online</code></a><sup class="po" id="note-52"><a href="#52">52</a></sup> module to double-check; it will ping the Internet&#8217;s root servers and/or the favicon of a few popular websites. For example:</p>
<pre><code class="language-javascript">const isOnline = require('is-online');

if(navigator.onLine){
  // hmm there's a connection, but is the Internet accessible?
  isOnline().then(online =&gt; {
    console.log(online); // true or false
  });
}
else {
  // we can trust navigator.onLine when it says there is no connection
  console.log(false);
}
</code></pre>
<p>Speaking of local files, there are a few things to be aware of when using the <code>file://</code> protocol — protocol-less URLs, for one; you can&#8217;t use them anymore. I mean URLs that start with <code>//</code> instead of <code>http://</code> or <code>https://</code>. Typically, if a web app requests <code>//example.com/hello.json</code>, then your browser would expand this to <code>http://example.com/hello.json</code> or to <code>https://example.com/hello.json</code> if the current page is loaded over HTTPS. In our app, the current page would load using the <code>file://</code> protocol; so, if we requested the same URL, it would expand to <code>file://example.com/hello.json</code> and fail. The real worry here is third-party modules you might be using; authors aren&#8217;t thinking of desktop apps when they make a library.</p>
<p>You&#8217;d never use a CDN. Loading local files is basically instantaneous. There&#8217;s also no limit on the number of concurrent requests (per domain), like there is on the web (with HTTP/1.1 at least). You can load as many as you want in parallel.</p>
<h4  id="artifacts-galore">Artifacts Galore <a href="#artifacts-galore" aria-label="Link to section 'Artifacts Galore'" class="sr hsl">Link</a></h4>
<p>A lot of asset generation is involved in creating a solid desktop app. You&#8217;ll need to generate executables and installers and decide on an auto-update system. Then, for each update, you&#8217;ll have to build the executables again, more installers (because if someone goes to your website to download it, they should get the latest version) and binary diffs for delta updates.</p>
<p>Weight is still a concern. A &#8220;Hello, World!&#8221; Electron app is 40 MB zipped. Besides the typical advice you follow when creating a web app (write less code, minify it, have fewer dependencies, etc.), there isn&#8217;t much I can offer you. The &#8220;Hello, World!&#8221; app is literally an app containing one HTML file; most of the weight comes from the fact that Chromium and Node.js are baked into your app. At least delta updates will reduce how much is downloaded when a user performs an update (on Windows only, I&#8217;m afraid). However, your users won&#8217;t be downloading your app on a 2G connection (hopefully!).</p>
<h4  id="expect-the-unexpected">Expect the Unexpected <a href="#expect-the-unexpected" aria-label="Link to section 'Expect the Unexpected'" class="sr hsl">Link</a></h4>
<p>You will discover unexpected behavior now and again. Some of it is more obvious than the rest, but a little annoying nonetheless. For example, let&#8217;s say you&#8217;ve made a music player app that supports a mini-player mode, in which the window is really small and always in front of any other apps. If a user were to click or tap a dropdown (<code>&lt;select/&gt;</code>), then it would open to reveal its options, overflowing past the bottom edge of the app. If you were to use a non-native select library (such as select2 or chosen), though, you&#8217;re in trouble. When open, your dropdown will be cut off by the edge of your app. So, the user would see a few items and then nothing, which is really frustrating. This would happen in a web browser, too, but it&#8217;s not often the user would resize the window down to a small enough size.</p>
<figure><a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/dropdownComparison-large-opt.png"><img src="https://www.smashingmagazine.com/wp-content/uploads/2017/01/dropdownComparison-preview-opt.png" alt="Screenshots comparing what happens to a native dropdown versus a non-native one" width="780" height="332" /></a><sup class="po" id="note-53"><a href="#53">53</a></sup><br />
<figcaption>Screenshots comparing what happens to a native dropdown versus a non-native one as they hit any edges of an app window (<a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/dropdownComparison-large-opt.png">View large version</a><sup class="po" id="note-54"><a href="#54">54</a></sup>)</figcaption>
</figure>
<p>You may or may not know it, but on a Mac, every window has a header and a body. When a window isn&#8217;t focused, if you hover over an icon or button in the header, its appearance will reflect the fact that it&#8217;s being hovered over. For example, the close button on macOS is gray when the window is blurred but red when you hover over it. However, if you move your mouse over something in the body of the window, there is no visible change. This is intentional. Think about your desktop app, though; it&#8217;s Chromium missing the header, and your app is the web page, which is the body of the window. You could drop the native frame and create your own custom HTML buttons instead for minimize, maximize and close. If your window isn&#8217;t focused, though, they won&#8217;t react if you were to hover over them. Hover styles won&#8217;t be applied, and that feels really wrong. To make it worse, if you were to click the close button, for example, it would focus the window and that&#8217;s it. A second click would be required to actually click the button and close the app.</p>
<p>To add insult to injury, Chromium has a bug that can mask the problem, making you think it works as you might have originally expected. If you move your mouse fast enough (nothing too unreasonable) from outside the window to an element inside the window, hover styles will be applied to that element. It&#8217;s a confirmed bug; applying the hover styles on a blurred window body &#8220;doesn&#8217;t meet platform expectations,&#8221; so it will be fixed. Hopefully, I&#8217;m saving you some heartbreak here. You could have a situation in which you&#8217;ve created beautiful custom window controls, yet in reality a lot of your users will be frustrated with your app (and will guess it&#8217;s not native).</p>
<p>So, you must use native buttons on a Mac. There&#8217;s no way around that. For an NW.js app, you must enable the native frame, which is the default anyway (you can disable it by setting <code>window</code> object&#8217;s <code>frame</code> property to <code>false</code> in your <code>package.json</code>).</p>
<p>You could do the same with an Electron app. This is controlled by setting the <code>frame</code> property when creating a window; for example, <code>new BrowserWindow({width: 800, height: 600, frame: true})</code>. As the Electron team does, they spotted this issue and added another option as a nice compromise; <code>titleBarStyle</code>. Setting this to <code>hidden</code> will hide the native title bar but keep the native window controls overlaid over the top-left corner of your app. This gets you around the problem of having non-native buttons on Mac, but you can still style the top of the app (and the area behind the buttons) however you like.</p>
<pre><code class="language-javascript">// main.js
const {app, BrowserWindow} = require('electron');
let mainWindow;

app.on('ready', () =&gt; {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 400,
    titleBarStyle: 'hidden'
  });
  mainWindow.loadURL('file://' + __dirname + '/index.html');
});
</code></pre>
<p>Here&#8217;s an app in which I&#8217;ve disabled the title bar and given the <code>html</code> element a background image:</p>
<figure><a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/hiddenTitleBar-large-opt.png"><img src="https://www.smashingmagazine.com/wp-content/uploads/2017/01/hiddenTitleBar-preview-opt.png" alt="A screenshot of our example app without the title bar" width="780" height="64" /></a><sup class="po" id="note-55"><a href="#55">55</a></sup><br />
<figcaption>A screenshot of our example app without the title bar (<a href="https://www.smashingmagazine.com/wp-content/uploads/2017/01/hiddenTitleBar-large-opt.png">View large version</a><sup class="po" id="note-56"><a href="#56">56</a></sup>)</figcaption>
</figure>
<p>See &#8220;<a href="http://electron.atom.io/docs/api/frameless-window">Frameless Window</a><sup class="po" id="note-57"><a href="#57">57</a></sup>&#8221; from Electron&#8217;s documentation for more.</p>
<h4  id="tooling">Tooling <a href="#tooling" aria-label="Link to section 'Tooling'" class="sr hsl">Link</a></h4>
<p>Well, you can pretty much use all of the tooling you&#8217;d use to create a web app. Your app is just HTML, CSS and JavaScript, right? Plenty of plugins and modules are out there specifically for desktop apps, too, such as Gulp plugins for signing your app, for example (if you didn&#8217;t want to use electron-builder). <a href="https://github.com/Quramy/electron-connect">Electron-connect</a><sup class="po" id="note-58"><a href="#58">58</a></sup> watches your files for changes, and when they occur, it&#8217;ll inject those changes into your open window(s) or relaunch the app if it was your main script that was modified. It is Node.js, after all; you can pretty much do anything you&#8217;d like. You could run webpack inside your app if you wanted to — I&#8217;ve no idea why you would, but the options are endless. Make sure to check out <a href="https://github.com/sindresorhus/awesome-electron">awesome-electron</a><sup class="po" id="note-59"><a href="#59">59</a></sup> for more resources.</p>
<h4  id="release-flow">Release Flow <a href="#release-flow" aria-label="Link to section 'Release Flow'" class="sr hsl">Link</a></h4>
<p>What&#8217;s it like to maintain and live with a desktop app? First of all, the release flow is completely different. A significant mindset adjustment is required. When you&#8217;re working on the web app and you deploy a change that breaks something, it&#8217;s not really a huge deal (of course, that depends on your app and the bug). You can just roll out a fix. Users who reload or change the page and new users who trickle in will get the latest code. Developers under pressure might rush out a feature for a deadline and fix bugs as they&#8217;re reported or noticed. You can&#8217;t do that with desktop apps. You can&#8217;t take back updates you push out there. It&#8217;s more like a mobile app flow. You build the app, put it out there, and you can&#8217;t take it back. Some users might not even update from a buggy version to the fixed version. This will make you worry about all of the bugs out there in old versions.</p>
<h4  id="quantum-mechanics">Quantum Mechanics <a href="#quantum-mechanics" aria-label="Link to section 'Quantum Mechanics'" class="sr hsl">Link</a></h4>
<p>Because a host of different versions of your app are in use, your code will exist in multiple forms and states. Multiple variants of your client (desktop app) could be hitting your API in 10 slightly different ways. So, you&#8217;ll need to strongly consider versioning your API, really locking down and testing it well. When an API change is to be introduced, you might not be sure if it&#8217;s a breaking change or not. A version released a month ago could implode because it has some slightly different code.</p>
<h4  id="fresh-problems-to-solve">Fresh Problems to Solve <a href="#fresh-problems-to-solve" aria-label="Link to section 'Fresh Problems to Solve'" class="sr hsl">Link</a></h4>
<p>You might receive a few strange bug reports — ones that involve bizarre user account arrangements, specific antivirus software or worse. I had a case in which a user had installed something (or had done something themselves) that messed with their system&#8217;s environment variables. This broke our app because a dependency we used for something critical failed to execute a system command because the command could no longer be found. This is a good example because there will be occasions when you&#8217;ll have to draw a line. This was something critical to our app, so we couldn&#8217;t ignore the error, and we couldn&#8217;t fix their machine. For users like this, a lot of their desktop apps would be somewhat broken at best. In the end, we decided to show a tailored error screen to the user if this unlikely error were ever to pop up again. It links to a document explaining why it has occurred and has a step-by-step guide to fix it.</p>
<p>Sure, a few web-specific concerns are no longer applicable when you&#8217;re working on a desktop app, such as legacy browsers. You will have a few new ones to take into consideration, though. There&#8217;s a 256-character limit on file paths in Windows, for example.</p>
<p>Old versions of npm store dependencies in a recursive file structure. Your dependencies would each get stored in their own directory within a <code>node_modules</code> directory in your project (for example, <code>node_modules/a</code>). If any of your dependencies have dependencies of their own, those grandchild dependencies would be stored in a <code>node_modules</code> within that directory (for example, <code>node_modules/a/node_modules/b</code>). Because Node.js and npm encourage small single-purpose modules, you could easily end up with a really long path, like <code>path/to/your/project/node_modules/a/node_modules/b/node_modules/c/.../n/index.js</code>.</p>
<p><em>Note</em>: Since version 3, npm flattens out the dependency tree as much as possible. However, there are other causes for long paths.</p>
<p>We had a case in which our app wouldn&#8217;t launch at all (or would crash soon after launching) on certain versions of Windows due to an exceeding long path. This was a major headache. With Electron, you can put all of your app&#8217;s code into an <a href="http://electron.atom.io/docs/tutorial/application-packaging/">asar archive</a><sup class="po" id="note-60"><a href="#60">60</a></sup>, which protects against path length issues but has exceptions and can&#8217;t always be used.</p>
<p>We created a little Gulp plugin named <a href="https://github.com/Teamwork/gulp-path-length">gulp-path-length</a><sup class="po" id="note-61"><a href="#61">61</a></sup>, which lets you know whether any dangerously long file paths are in your app. Where your app is stored on the end user&#8217;s machine will determine the true length of the path, though. In our case, our installer will install it to <code>C:\Users\&lt;username&gt;\AppData\Roaming</code>. So, when our app is built (locally by us or by a continuous integration service), gulp-path-length is instructed to audit our files as if they&#8217;re stored there (on the user&#8217;s machine with a long username, to be safe).</p>
<pre><code class="language-javascript">var gulp = require('gulp');
var pathLength = require('gulp-path-length');

gulp.task('default', function(){
    gulp.src('./example/**/*', {read: false})
        .pipe(pathLength({
	        rewrite: {
		        match: './example',
		        replacement: 'C:\\Users\\this-is-a-long-username\\AppData\\Roaming\\Teamwork Chat\\'
	        }
        }));
});
</code></pre>
<h4  id="fatal-errors-can-be-really-fatal">Fatal Errors Can Be Really Fatal <a href="#fatal-errors-can-be-really-fatal" aria-label="Link to section 'Fatal Errors Can Be Really Fatal'" class="sr hsl">Link</a></h4>
<p>Because all of the automatic updates handling is done within the app, you could have an uncaught exception that crashes the app before it even gets to check for an update. Let&#8217;s say you discover the bug and release a new version containing a fix. If the user launches the app, an update would start downloading, and then the app would die. If they were to relaunch app, the update would start downloading again and… crash. So, you&#8217;d have to reach out to all of your users and let them know they&#8217;ll need to reinstall the app. Trust me, I know. It&#8217;s horrible.</p>
<h4  id="analytics-and-bug-reports">Analytics and Bug Reports <a href="#analytics-and-bug-reports" aria-label="Link to section 'Analytics and Bug Reports'" class="sr hsl">Link</a></h4>
<p>You&#8217;ll probably want to track usage of the app and any errors that occur. First of all, Google Analytics won&#8217;t work (out of the box, at least). You&#8217;ll have to find something that doesn&#8217;t mind an app that runs on <code>file://</code> URLs. If you&#8217;re using a tool to track errors, make sure to lock down errors by app version if the tool supports release-tracking. For example, if you&#8217;re using <a href="https://sentry.io/welcome/">Sentry</a><sup class="po" id="note-62"><a href="#62">62</a></sup> to track errors, make sure to <a href="https://docs.sentry.io/clients/javascript/config/#optional-settings">set the <code>release</code> property when setting up your client</a><sup class="po" id="note-63"><a href="#63">63</a></sup>, so that errors will be split up by app version. Otherwise, if you receive a report about an error and roll out a fix, you&#8217;ll keep on receiving reports about the error, filling up your reports or logs with false positives. These errors will be coming from people using older versions.</p>
<p>Electron has a <a href="http://electron.atom.io/docs/api/crash-reporter/"><code>crashReporter</code></a><sup class="po" id="note-64"><a href="#64">64</a></sup> module, which will send you a report any time the app completely crashes (i.e. the entire app dies, not for any old error thrown). You can also listen for events indicating that your renderer process has become unresponsive.</p>
<h4  id="security">Security <a href="#security" aria-label="Link to section 'Security'" class="sr hsl">Link</a></h4>
<p>Be extra-careful when accepting user input or even trusting third-party scripts, because a malicious individual could have a lot of fun with access to Node.js. Also, never accept user input and pass it to a native API or command without proper sanitation.</p>
<p>Don&#8217;t trust code from vendors either. We had a problem recently with a third-party snippet we had included in our app for analytics, provided by company X. The team behind it rolled out an update with some dodgy code, thereby introducing a fatal error in our app. When a user launched our app, the snippet grabbed the newest JavaScript from their CDN and ran it. The error thrown prevented anything further from executing. Anyone with the app already running was unaffected, but if they were to quit it and launch it again, they&#8217;d have the problem, too. We contacted X&#8217;s support team and they promptly rolled out a fix. Our app was fine again once our users restarted it, but it was scary there for a while. We wouldn&#8217;t have been able to patch the problem ourselves without forcing affected users to manually download a new version of the app (with the snippet removed).</p>
<p>How can you mitigate this risk? You could try to catch errors, but you&#8217;ve no idea what they company X might do in its JavaScript, so you&#8217;re better off with something more solid. You could add a level of abstraction. Instead of pointing directly to X&#8217;s URL from your <code>&lt;script&gt;</code>, you could use <a href="https://www.google.ie/analytics/tag-manager/">Google Tag Manager</a><sup class="po" id="note-65"><a href="#65">65</a></sup> or your own API to return either HTML containing the <code>&lt;script&gt;</code> tags or a single JavaScript file containing all of your third-party dependencies somehow. This would enable you to change which snippets get loaded (by tweaking Google Tag Manager or your API endpoint) without having to roll out a new update.</p>
<p>However, if the API no longer returned the analytics snippet, the global variable created by the snippet would still be there in your code, trying to call undefined functions. So, we haven&#8217;t solved the problem entirely. Also, this API call would fail if a user launches the app without a connection. You don&#8217;t want to restrict your app when offline. Sure, you could use a cached result from the last time the request succeeded, but what if there was a bug in that version? You&#8217;re back to the same problem.</p>
<p>Another solution would be to create a hidden window and load a (local) HTML file there that contains all of your third-party snippets. So, any global variables that the snippets create would be scoped to that window. Any errors thrown would be thrown in that window and your main window(s) would be unaffected. If you needed to use those APIs or global variables in your main window(s), you&#8217;d do this via IPC now. You&#8217;d send an event over IPC to your main process, which would then send it onto the hidden window, and if it was still healthy, it would listen for the event and call the third-party function. That would work.</p>
<p>This brings us back to security. What if someone malicious at company X were to include some dangerous Node.js code in their JavaScript? We&#8217;d be rightly screwed. Luckily, Electron has a nice option to disable Node.js for a given window, so it simply wouldn&#8217;t run:</p>
<pre><code class="language-javascript">// main.js
const {app, BrowserWindow} = require('electron');
let thirdPartyWindow;

app.on('ready', () =&gt; {
  thirdPartyWindow = new BrowserWindow({
    width: 500,
    height: 400,
    webPreferences: {
      nodeIntegration: false
    }
  });
  thirdPartyWindow.loadURL('file://' + __dirname + '/third-party-snippets.html');
});
</code></pre>
<h4  id="automated-testing">Automated Testing <a href="#automated-testing" aria-label="Link to section 'Automated Testing'" class="sr hsl">Link</a></h4>
<p>NW.js doesn&#8217;t have any built-in support for testing. But, again, you have access to Node.js, so it&#8217;s technically possible. There is a way to test stuff such as button-clicking within the app using <a href="https://github.com/cyrus-and/chrome-remote-interface">Chrome Remote Interface</a><sup class="po" id="note-66"><a href="#66">66</a></sup>, but it&#8217;s tricky. Even then, you can&#8217;t trigger a click on a native window control and test what happens, for example.</p>
<p>The Electron team has created <a href="http://electron.atom.io/spectron/">Spectron</a><sup class="po" id="note-67"><a href="#67">67</a></sup> for automated testing, and it supports testing native controls, managing windows and simulating Electron events. It can even be run in continuous integration builds.</p>
<pre><code class="language-javascript">var Application = require('spectron').Application
var assert = require('assert')

describe('application launch', function () {
  this.timeout(10000)

  beforeEach(function () {
    this.app = new Application({
      path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
    })
    return this.app.start()
  })

  afterEach(function () {
    if (this.app &amp;&amp; this.app.isRunning()) {
      return this.app.stop()
    }
  })

  it('shows an initial window', function () {
    return this.app.client.getWindowCount().then(function (count) {
      assert.equal(count, 1)
    })
  })
})
</code></pre>
<p>Because your app is HTML, you could easily use any tool to test web apps, just by pointing the tool at your static files. However, in this case, you&#8217;d need to make sure the app can run in a web browser without Node.js.</p>
<h3  id="desktop-and-web">Desktop And Web <a href="#desktop-and-web" aria-label="Link to section 'Desktop And Web'" class="sr hsl">Link</a></h3>
<p>It&#8217;s not necessarily about desktop or web. As a web developer, you have all of the tools required to make an app for either environment. Why not both? It takes a bit more effort, but it&#8217;s worth it. I&#8217;ll mention a few related topics and tools, which are complicated in their own right, so I&#8217;ll keep just touch on them.</p>
<p>First of all, forget about &#8220;browser lock-in,&#8221; native WebSockets, etc. The same goes for ES6. You can either revert to writing plain old ES5 JavaScript or use something like <a href="https://babeljs.io/">Babel</a><sup class="po" id="note-68"><a href="#68">68</a></sup> to transpile your ES6 into ES5, for web use.</p>
<p>You also have <code>require</code>s throughout your code (for importing other scripts or modules), which a browser won&#8217;t understand. Use a module bundler that supports CommonJS (i.e. Node.js-style <code>require</code>s), such as <a href="http://rollupjs.org">Rollup</a><sup class="po" id="note-69"><a href="#69">69</a></sup>, <a href="https://webpack.github.io">webpack</a><sup class="po" id="note-70"><a href="#70">70</a></sup> or <a href="http://browserify.org">Browserify</a><sup class="po" id="note-71"><a href="#71">71</a></sup>. When making a build for the web, a module bundler will run over your code, traverse all of the <code>require</code>s and bundle them up into one script for you.</p>
<p>Any code using Node.js or Electron APIs (i.e. to write to disk or integrate with the desktop environment) should not be called when the app is running on the web. You can detect this by checking whether <code>process.version.nwjs</code> or <code>process.versions.electron</code> exists; if it does, then your app is currently running in the desktop environment.</p>
<p>Even then, you&#8217;ll be loading a lot of redundant code in the web app. Let&#8217;s say you have a <code>require</code> guarded behind a check like <code>if(app.isInDesktop)</code>, along with a big chunk of desktop-specific code. Instead of detecting the environment at runtime and setting <code>app.isInDesktop</code>, you could pass <code>true</code> or <code>false</code> into your app as a flag at buildtime (for example, using the <a href="https://github.com/hughsk/envify">envify</a><sup class="po" id="note-72"><a href="#72">72</a></sup> transform for Browserify). This will aide your module bundler of choice when it&#8217;s doing its static analysis and tree-shaking (i.e. dead-code elimination). It will now know whether <code>app.isInDesktop</code> is <code>true</code>. So, if you&#8217;re running your web build, it won&#8217;t bother going inside that <code>if</code> statement or traversing the <code>require</code> in question.</p>
<h4  id="continuous-delivery">Continuous Delivery <a href="#continuous-delivery" aria-label="Link to section 'Continuous Delivery'" class="sr hsl">Link</a></h4>
<p>There&#8217;s that release mindset again; it&#8217;s challenging. When you&#8217;re working on the web, you want to be able to roll out changes frequently. I believe in continually delivering small incremental changes that can be rolled back quickly. Ideally, with enough testing, an intern can push a little tweak to your master branch, resulting in your web app being automatically tested and deployed.</p>
<p>As we covered earlier, you can&#8217;t really do this with a desktop app. OK, I guess you technically could if you&#8217;re using Electron, because electron-builder can be automated and, so, can spectron tests. I don&#8217;t know anyone doing this, and I wouldn&#8217;t have enough faith to do it myself. Remember, broken code can&#8217;t be taken back, and you could break the update flow. Besides, you don&#8217;t want to deliver desktop updates too often anyway. Updates aren&#8217;t silent, like they are on the web, so it&#8217;s not very nice for the user. Plus, for users on macOS, delta updates aren&#8217;t supported, so users would be downloading a full new app for each release, no matter how small a tweak it has.</p>
<p>You&#8217;ll have to find a balance. A happy medium might be to release all fixes to the web as soon as possible and release a desktop app weekly or monthly — unless you&#8217;re releasing a feature, that is. You don&#8217;t want to punish a user because they chose to install your desktop app. Nothing&#8217;s worse than seeing a press release for a really cool feature in an app you use, only to realize that you&#8217;ll have to wait a while longer than everyone else. You could employ a feature-flags API to roll out features on both platforms at the same time, but that&#8217;s a whole separate topic. I first learned of feature flags from &#8220;<a href="https://www.youtube.com/watch?v=JR-ccCTmMKY">Continuous Delivery: The Dirty Details</a><sup class="po" id="note-73"><a href="#73">73</a></sup>,&#8221; a talk by Etsy&#8217;s VP of Engineering, Mike Brittain.</p>
<h3  id="conclusion">Conclusion <a href="#conclusion" aria-label="Link to section 'Conclusion'" class="sr hsl">Link</a></h3>
<p>So, there you have it. With minimal effort, you can add &#8220;desktop app developer&#8221; to your resumé. We&#8217;ve looked at creating your first modern desktop app, packaging, distribution, after-sales service and a lot more. Hopefully, despite the pitfalls and horror stories I&#8217;ve shared, you&#8217;ll agree that it&#8217;s not as scary as it seems. You already have what it takes. All you need to do is look over some API documentation. Thanks to a few new powerful APIs at your disposal, you can get the most value from your skills as a web developer. I hope to see you around (in the NW.js or Electron community) soon.</p>
<h4  id="further-reading">Further Reading <a href="#further-reading" aria-label="Link to section 'Further Reading'" class="sr hsl">Link</a></h4>
<ul>
<li>&#8220;<a href="http://engineroom.teamwork.com/resurrecting-clippy/">Resurrecting Clippy</a><sup class="po" id="note-74"><a href="#74">74</a></sup>,&#8221; Adam Lynch (me)<br />
How I built clippy.desktop with NW.js.</li>
<li>&#8220;<a href="http://jlord.us/essential-electron/">Essential Electron</a><sup class="po" id="note-75"><a href="#75">75</a></sup>,&#8221; Jessica Lord<br />
A plain-speak introduction to Electron and its core concepts.</li>
<li><a href="http://electron.atom.io/docs/">Electron Documentation</a><sup class="po" id="note-76"><a href="#76">76</a></sup><br />
Want to dig into the details? Get it straight from the source.</li>
<li>&#8220;<a href="http://electron.atom.io/community/">Electron Community</a><sup class="po" id="note-77"><a href="#77">77</a></sup>&#8221;<br />
A curated list of Electron-related tools, videos and more.</li>
<li>&#8220;<a href="http://engineroom.teamwork.com/serverless-crash-reports-for-electron-apps/">Serverless Crash Reporting for Electron Apps</a><sup class="po" id="note-78"><a href="#78">78</a></sup>,&#8221; Adam Lynch (me)<br />
My experience dabbling with serverless architecture, specifically for handling crash reports from Electron apps.</li>
<li><a href="https://github.com/electron-userland/electron-builder">electron-builder</a><sup class="po" id="note-79"><a href="#79">79</a></sup><sup class="po" id="note-39"><a href="#39">39</a></sup>, Stefan Judis<br />
The complete solution for packaging and building a ready-for-distribution Electron app, with support for automatic updates (and more) out of the box.</li>
<li>&#8220;<a href="http://electron.atom.io/docs/api/auto-updater/">autoUpdater</a><sup class="po" id="note-80"><a href="#80">80</a></sup><sup class="po" id="note-45"><a href="#45">45</a></sup>,&#8221; Electron Documentation<br />
See just how simple Electron&#8217;s automatic-update API is.</li>
</ul>