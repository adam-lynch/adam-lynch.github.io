---
date: 2018-03-03
tags:
  - ux
  - permissions
  - javascript
  - web
  - notifications
  - geolocation
  - extension
  - browsers
---

## How to improve your permissions UX

:::summary

"Welcome to Costco, can I have your phone number?" Most people would refuse, right? Well I suppose *some* might oblige, but that depends on a host of factors. This is what permissions requests are like on the web. Let's take a look at how we can do better, before it's too late. Side note: a phone number is like a SnapChat username to your parents.

:::

We sure can build amazing experiences these days. We can leverage powerful browser APIs to access  users' location, send them notifications (whether your site is open or not), interact with MIDI devices, and a lot more. We didn't get here on our own though. A lot of these capabilities came to other platforms first. We are in our own league when it comes to UX and engagement however. Most users see permissions requests (and these capabilities) as a nuisance.

:::figure improve-permissions-ux/chris-wilson.png Chris Wilson, [The New Bar for Web Experiences](https://www.youtube.com/watch?v=PsgW-0M67TQ) (Chrome Dev Summit 2017)
:::

At the last Chrome Dev Summit, Chris Wilson revealed that over 90% of permissions requests in Chrome for Android were unsuccessful. It's understandable. If there were an annoyance scale, I'd position it somewhere between auto-playing media and when native mobile apps open a page from their own website in a WebView, which has a banner that tells you to install their mobile app.

Examples aren't needed because we've all experienced it. It's not so bad if it's obvious why the permission is needed, but in general, we need to try harder. [Peter-Paul Koch argued](https://www.quirksmode.org/blog/archives/2015/05/web_vs_native_l.html) that the web shouldn't emulate native (apps) because it will lead to bad UX. Was he right? These APIs aren't at fault but our implementations are sloppy. As web developers and designers we should lift our heads up and look around a bit more; we can learn a lot from mobile (and other platforms).


### Why should I care?

Well, the user's experience should be of utmost importance in general, but in particular, it's a bad first impression to immediately ask someone for their location. A permissions request is an easy way to disrupt the user and it instantly makes your site less trustworthy. From content credibility to conversions, trust plays a key role on the web. Simplest of all, you aren't achieving what you set out to; users aren't accepting permissions requests. In fact, it could be hurting you more than it helps. For example, you might want to send people notifications to reduce churn and keep them coming back to your content. However, it could be driving people away before they even read a single article.

:::figure improve-permissions-ux/balls.jpg What the permissions prompt looks like in Chrome 63.
:::

Chrome 63 (mobile) [adds fuel to the fire](https://cloudfour.com/thinks/time-to-update-your-permissions-ux/). Requests appear like modals in front of the content and users no longer have the option to dismiss the request without making a decision. This will also reduce the amount of repeat requests as users can no longer dismiss. This will surely spur sites to improve their UX. Users will not put up with sites triggering a modal like that on top of HTML modals, banners and annoying ads covering the page on load.

What will browsers do if we don't improve? They might disable access to these APIs by default. Users would then have to grant the permission from their browser settings. If browsers feel like being nice they might show a little icon somewhere (e.g. in the address bar) which would show the prompt on click. Disabling by default would be extreme but Google already [removed the notification centre](https://venturebeat.com/2018/03/01/microsoft-improves-its-ai-face-and-image-recognition-tools/) citing lack of usage and it would certainly make a lot of users happy.


### When should I request access to these APIs?

Don't. Just don't. Only ask for access if you really need it. If you're playing around on your personal site or making an API demo, fine, but if you have users, have empathy. You are not your users. If you're asking right away because it's critical to your app, I'd re-think that. Will your site or app really not function without it? I doubt it. Otherwise, you'd have to block people from using your app who respond negatively to the permissions request then? Even https://webcamtests.com/ doesn't immediately ask for access to your webcam.

If you actually need access, context is key. It starts at the door. Make sure the user understands what your site or app is about. How can they if they're immediately presented with a request to track their location? Provide some value to the user first if you can, build some trust. Only ask *when* you really need to. Wait until they get to your store locator before you even begin to think about asking for their location. Ask the user if they'd like to receive notifications of new articles after they'd read a couple. People often think of progressive enhancement as a stack. Just because the user's browsers supports a feature, doesn't mean you should use it right away. There is something to be said for nailing the core experience and enhancing it over time, you know, progressively.


### The double request pattern

If you are going to interrupt the user (and that's what it is, an interruption), then at least do your best to increase the chances of acceptance. You may only get one attempt. Clicking "Block" in Google Chrome is permanent, unless the user goes and manually overrides it for your site in Chrome's settings. Other browsers have a "Remember this choice" checkbox which results in the same thing.  

:::figure improve-permissions-ux/google-calendar.png Google Calendar's fake UI prompt for notifications
:::

This is where the double request pattern from mobile-land comes in. Show some fake UI first, i.e. HTML. If the user responds positively, then trigger the native permissions request. If it's rejected or ignored, then fine. You're not limited to one attempt and can ask them again whenever you want. Be smart here though, don't bombard the user. Ask again after a few more visits or come up with a clever algorithm.

Requests without context are granted 40% less (another fact Chris Wilson shared in his talk). When showing this fake prompt, explain why the permission is needed, how the user will benefit, what will happen once they accept (the native request prompt will appear), etc. If you want to send notifications, what will the notifications be about? How often will the user receive them? The new Google Calendar's fake notification prompt is a good example.

You were probably imagining a popup (like Google Calendar's one) so far, but hiding the option away in your app's settings would be even better (although they're not mutually exclusively). Allowing the user to opt-in like that is surely the pattern with the highest success rate.


#### The permissions API

One problem with using fake UI is knowing whether or not the user has already granted the permission. You don't want to show the popup again on every visit and if it's an app setting, it should look enabled. Some of the APIs provide a way to figure this out. Notifications for example; `Notification.permission` will either be `granted`, `denied`, or `prompt`. This varies from API to API and some APIs haven't got an option like that at all. For example, the geolocation API; there is no way to check if the user has previously granted access to their location without requesting it again.
 
The [Permissions API](https://w3c.github.io/permissions/) comes in handy here. It allows us to query the status of any permission through a single (asynchronous) interface, even the geolocation API. For example:

```javascript
navigator.permissions.query({ name: 'notifications' })
  .then((result) -> {
	  if(result.status === 'granted'){
	    // They've granted permission previously
	  }
	  // Otherwise result.status is 'denied' or 'prompt'
  })
  .catch((error) -> {
    /* 
     * The permission state cannot be checked. 
     * E.g. Firefox didn't support the persistent-storage permission name until Firefox 53
     */
  });
```

For some APIs, permissions aren't as simple though so you can provide some context when querying;

```javascript
navigator.permissions.query({ name: 'midi', sysex: true })
  // ...
```

Unfortunately, the Permissions API is currently only supported in Chrome (43+) and Firefox (46+). When a permission is explicitly granted or denied, you can store that information in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) (or elsewhere) as a fallback. Then you can look up the permission's state there instead of querying it using the Permission API.

The [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/API/Permissions) also describes similar methods for requesting and revoking permissions. No browser supports the former and the latter is only supported in Firefox (47+);

```javascript
navigator.permissions.revoke({ name: 'microphone' })
  // ...
```


### Incentivize the user

To encourage the user to opt-in, you could explain that they will be rewarded in some way. It's to you what that reward could be. Alternatively, you could just use gamification. For example, you could show an on-boarding checklist somewhere in your app, containing "Enable notifications" and anything else you'd like. Simply showing the number of completed items or completion percentage to the user will be enough to get some to enable notifications. Don't blackmail users though; don't block them from using certain features until they've granted a permission or signed up for your newsletter or anything like that.


### What if the native request is rejected?

It's unlikely but there is a chance the user could still reject access once the native prompt is shown (or ignore it). If this happens, you should show some feedback and explain how to manually enable the permission via their browser settings (or link to an explanation).

:::figure improve-permissions-ux/whatsapp.png The overlay WhatsApp (web) shows when the native prompt is shown.
:::

We can do more than cross our fingers though. When the user interacts with your fake UI and you're about to trigger the native prompt, you could show something to guide them. It could even be an overlay which covers the entire page. By doing this, you can draw more attention to the prompt, prevent it being ignored, and even show some text. I remember when Google Chrome first got popular, some sites would show an arrow pointing at the download bar after you downloaded something. It was crude but it worked. I'd keep this overlay simple though. You shouldn't assume where the native prompt will appear, browser-sniff, or have too much code here in general.


### Be reasonable

What you do once they enable the permission is another story. First of all, you should ideally give users the option to opt-out. Especially if it's notifications they're granting, [don't go overboard](https://www.youtube.com/watch?v=gkND9G_VqVo). There is no spam filter for notifications. You could provide further settings to tweak how permissions are used. For example, Slack provides granular settings around notifications. My favourite part is that it defaults to sending you a notification for every message but once you've settled into app, it recommends reducing your notification level so you'll only get notified when you're @mentioned.

Don't send the user multiple notifications for the same thing. Even if I've your app is open in 20 tabs, I should only get one notification per event. The Notification API allows you to provide a "tag" to achieve this;

```javascript
new Notification("New email from ...", { 
  body: "Hey, how are you? I was wondering...",
  tag: "1" 
  // ...
});
```

If multiple notifications are created with the same tag (e.g. an email ID), the user will only receive one.


### Be pragmatic

You don't need to do *all* of this. It depends how important the permission in question is to your site. The web would be a better place if everyone applied even a little bit of this.

::: quote Peter Drucker
If you can't measure it, you can't improve it.
:::

For each permission or feature, track engagement and acceptance, how far users get before rejecting a permission, etc. This is a conversion funnel like any other. You can then tweak it and A/B test.


### Dear browsers

Help us out. Changes could be made to improve the experience for users and prevent abuse. To be fair, browsers block requesting a permission after three dismissals (i.e. when the user ignores it). Google Chrome (at least) allows requests again after a week. This is good but more could be done. 

Maybe browsers could allow us to provide some text (a new API option) that will be shown within the native prompt to give more context to the user. This might make a request to access the user's microphone feel a bit less creepy. Alternatively, if we pass a callback, the prompt could have an icon, link, or button to learn why the permission is being requested.

Now let's take a look at some measures that already exist to prevent abuse. As a security feature, the Bluetooth API doesn't allow you to request a device unless it was triggered by a "user gesture" such as a touch or click. 

Chrome (at least) no longer allows notifications from iFrames, from insecure origins ([like other features](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins)), and even warns you if you request notifications and it wasn't in response to a user gesture. Can't we just enforce this for any permissions request?

Chrome's rules around accessing persistent-storage aren't as simple; Chrome will automatically grant the persistence permission if any of the following are true:

- The site is bookmarked (and the user has 5 or less bookmarks)
- The site has high site engagement
- The site has been added to home screen
- The site has push notifications enabled

Otherwise, the permission is automatically denied. 

I'm not saying those rules are good or bad but browsers should agree on *some* rules to enforce in respect to all permissions requests. That is my plea. Of course, developers and designers need to do better regardless, but this would really help.

P.S. I noticed there's now a [Dialog API](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog); it would be nice to add some rules here too before it gets too popular and people are using it to display ads the second you hit their page. 


### Introducing AskBlocker

I've been thinking about writing this for a long time and it was Jason Grigsby's [Time to Update Your Permissions UX](https://cloudfour.com/thinks/time-to-update-your-permissions-ux/) post that inspired me to actually do it. Not only did it turn out to be much longer than I expected, but I brought more work on myself by deciding to create browser extensions as well. 

:::figure improve-permissions-ux/askblocker.png AskBlocker for Chrome (screenshot)
:::

[AskBlocker](https://adamlynch.com/askblocker/) is an extension for Chrome, Firefox, and Brave, which keeps permissions requests in check. Permissions requests are blocked until you've interacted with the page (i.e. click, tap, or key press), with the following exceptions:

- If the permission has been previously requested and granted (or explicitly denied).
- If the domain is `localhost` or `127.0.0.1`.
- If you've navigated to the current page from another page on the same domain.

This will at least block immediate requests to enable notifications the first time you go a site. You can see the requests which were caught and whitelist them (it will ask again and reload, to be safe). It's [open-source](https://github.com/adam-lynch/askblocker).

Note: There aren't any extensions for other browsers (yet) because they don't support the Permissions API. 


### Conclusion

- We can learn lessons from mobile development and more.
- Users aren't granting permissions requests.
- It's no longer possible to dismiss requests in Google Chrome's mobile apps.
- We looked at how to improve your permissions UX and increase acceptance rate; the keys are discipline, context, timing, measuring, and trust, among others.
- Browsers, please help.
- Try out [AskBlocker](https://adamlynch.com/askblocker).
