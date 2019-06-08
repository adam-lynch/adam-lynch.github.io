---
date: 2016-11-22
original:
  blogLink: https://engineroom.teamwork.com
  blogName: Teamwork's Engine Room
  url: https://engineroom.teamwork.com/serverless-crash-reporting-for-electron-apps-fe6e62e5982a
tags:
  - serverless
  - electron
  - javascript
  - aws
  - development
---

## Serverless crash reporting for Electron apps

[![](https://cdn-images-1.medium.com/max/1600/1*7_8IQl1UmmFdv-Z3EwGNJg.png)](https://cdn-images-1.medium.com/max/1600/1*7_8IQl1UmmFdv-Z3EwGNJg.png)


:::summary

The term “serverless” has been trendy for a while now. In this post, I’m going to share my experience dabbling with serverless architecture, specifically for handling crash reports from [Electron](http://electron.atom.io/) apps.

:::

### The conference

I attend about two or three conferences a year, typically related to JavaScript or the Web. Some have been amazing, like [NodeConf EU](http://www.nodeconf.eu/). A few others were slightly disappointing, in that I expected to learn more. If you’re unlucky, some conferences can feel a little like a recap of the articles and books you’ve read over the previous year. Each developer at Teamwork gets one paid conference per year. This year, I decided to change things up and go for a topic I know little about, so I chose to head to New York for the first ever [ServerlessConf](http://serverlessconf.io/).

I bought a [Udemy](https://www.udemy.com/) course on [AWS Lambda](https://aws.amazon.com/lambda/) during a sale and the video or two I watched of that was the extent of my knowledge on serverless architecture. So what does “serverless” even mean? I’m not sure anyone knows really, but more on that later. The idea with Lambda is that once you supply some code (a stateless “function”) in one of the supported languages, you can trigger it via an API you configure, other events, or on a schedule (think Cron). The typical example is creating thumbnails whenever an image is added to a particular [S3](https://aws.amazon.com/s3/) bucket.


[![](https://cdn-images-1.medium.com/max/1600/0*PunR2epJ6yYV0f9_.png)](https://cdn-images-1.medium.com/max/1600/0*PunR2epJ6yYV0f9_.png)

So you push up little chunks of code which can all be written in different languages if you like and can be updated independently at any point. You only pay when your functions are executing. Compare that to setting up an API on an [EC2](https://aws.amazon.com/ec2/) instance where you’ll pay even if it’s sitting there idle. By default, your functions can only execute for 3 seconds at most before being killed but that can be configured (to anything between 1–300 seconds). What’s great as well is that Lambda will completely handle scaling for you.

The conference was good, especially for one so cheap (even though I’d have paid for some air conditioning :/). Of course some talks were basically people pushing their services but overall it was interesting. It was clear the speakers couldn’t agree on what “serverless” meant. Some implied it was about not managing your own servers or replacing a certain chunk of your server stack but keeping the rest, using third-party services and APIs at every possible chance, among others. My takeaway is that “serverless” is really about “functions as a unit of deployment” and everything else is secondary. It’s up to you how you use it.

Most of the talks involved AWS and there were a lot of jokes at [API Gateway](https://aws.amazon.com/api-gateway/)’s expense (the AWS tool you must configure to expose an API for your functions, which apparently is very awkward). Joe Emison gave an interesting [talk](http://www.slideshare.net/ServerlessConf/joe-emison-10x-product-development) on using third-party services and serverless architectures to get his apps to market quickly. He essentially created thick clients leveraging services like [Firebase](https://firebase.google.com/), [Auth0](https://auth0.com/), [Algolia](https://www.algolia.com/), [Netlify](https://www.netlify.com/), [Webtask.io](https://webtask.io/), and more. I admired his cojones in pointing out that nothing AWS offers is best-in-class individually, as long as you don’t mind not having everything in one place, given that the general manager of AWS Lambda was in the front row.

Overall, I didn’t learn _that_ much. A lot of the talks were high-level talks on stacks, etc. I came away optimistic and still curious about serverless architecture as well as Firebase and more.

### The crash reporter

We’re currently rewriting our desktop apps to be based on Electron rather than [NW.js](http://nwjs.io/). I’m sure this is going to be the first of many posts on that so I won’t go into too much detail here. I recently wrote a book on Electron called [Developing an Electron Edge](http://shop.oreilly.com/product/9781939902344.do) and while proofreading it, a nice serverless use case struck me; serverless crash reporting.

Sure, we report runtime errors to [Sentry](https://sentry.io/teamwork/) when they occur in [Teamwork Chat](https://teamwork.com/chat), but what if the app crashes entirely? Well, we’re in the dark there. One of the nice features Electron has over NW.js is crash reporting. Once you set up Electron’s [`crash-reporter`](http://electron.atom.io/docs/api/crash-reporter/) module in your main and renderer process(es), it will send a POST request to the URL you've supplied any time the app crashes with some helpful information including the type of process which died, the app version, the OS, a dump file for debugging, and more.

```javascript
const { crashReporter } = require('electron');

crashReporter.start({
 productName: 'YourAppName;',
 companyName: 'YourCompany;',
 submitURL: 'https://your-domain.com/url-to-submit&amp',
 autoSubmit: true
});
```

That’s all you need. If you want to crash your app to test this out, call process.crash in your main process or any renderer process.

```javascript
const { app, crashReporter } = require('electron’);

app.on('ready’, () => {
  crashReporter.start({
    productName: 'YourAppName’,
    companyName: 'YourCompany',
    submitURL: 'https://your-domain.com/url-to-submit',autoSubmit: true
  });
  setTimeout(() => {
  process.crash()
  }, 3000);
})
```

### The serverless crash reporter

So how can we make this serverless? We could have a Lambda function which accepts a POST, uploads the dump file to S3 and then sends an error event to Sentry with the URL to the file in the metadata. Nice right? I thought so anyway. We don’t want a whole server there running and waiting for crash reports. Ideally you wouldn’t have too many of these and therefore using Lambda should be very cheap.

It would just be a fun little project too, right? Gordon (devOps) and I had been interested in testing out something serverless for awhile and it was an attractive idea given that we had a few big ongoing projects within Teamwork Chat;

*   Search.
*   Redoing a lot of our backend, breaking into smaller microservices using RabbitMQ, Kubernetes, and more.
*   New (Electron) desktop apps.
*   New (native) mobile apps.

Expect a few posts on those topics.

Anyway, I thought serverless crash reporting would be a nice little side-project I could throw a few hours into without needing too much knowledge on anything, so I started with the function itself.

The function

I started out by creating an S3 bucket, grabbed some API credentials, created a new Sentry project, and grabbed its DSN. We write everything in [CoffeeScript at Teamwork](https://adamlynch.com/coffeescript-at-teamwork/) but this will only be a few lines long, what’s the harm in a little ES6?

I quickly threw together a module which did what I wanted. To test it, I created another script which required the first file, started an API with [express](http://expressjs.com/), and called my function whenever it received a POST.

```javascript
ravenClient = new raven.Client(config.sentryDsn, {
 release: options._version
});
```

When instantiating [Raven](https://github.com/getsentry/raven-node) (Sentry’s Node.js client module), it’s important to note that I’m passing the app version as the release. This will also me to browse the errors on Sentry by app version and do whatever I like with them. This very handy. Otherwise, you could have an old buggy version of your app still being used by customers filling up your error logs.

Another thing worth mentioning is that writing single-use code is jarring. There are a few best practices you could not do and it would work fine; you don’t need to clean up that variable, that callback won’t be called again, etc.

Now I could start our Electron app which calls process.crash in its main process, a POST request would be sent to the local API, the file would go to S3, and finally a Sentry event would be created. I’m not sure if this is how people typically work serverlessly. It worked for me. I could easily mock some of the calls when debugging too.

The Lambda function

Even though I had never used Lambda, I assumed that was the easy part. As far as I knew, all I needed for Lambda was a Node.js module that exported a function with which accepted certain arguments. I thought I might have had some issues with dependencies, I didn’t expect Lambda to be installing modules from npm. I assumed all I’d need to do is bundle them up into a ZIP or something like that for Lambda to use.

It wasn’t so easy in reality. Gordon stepped in to help out but long story short… it’s not possible to do what I had planned to do with Lambda; it doesn’t support file uploads.

A few suggested a workaround of putting the file on S3 and have that trigger the Lambda function but the POST is not under our control. I’d have to point the crash-reporter module at an intermediary URL which would accept the file, put it on S3, and the Lambda function would take over from there. That’s back to the original problem though; if I went with that, there’s no point in using Lambda at all.

Around the same time, I started investigating the [Serverless Framework](https://serverless.com/). It looked interesting. It’s a framework for Node.js functions with CLI tools which make publishing functions easier, stuff for testing functions, and more. The idea is that AWS Lambda is one of the platforms supported by Serverless Framework, along with Google CloudFunctions and more. I think there’s a company behind it but a lot of it is [open-sourced](https://github.com/serverless/serverless), I think.

Maybe this framework would allow me to workaround my problem or at least I could point it to another hosting provider which _does_ support POSTing of files. I [posted](http://forum.serverless.com/t/no-support-for-posting-files/307) in their forum and played around with it in the meantime. On closer inspection, I found it to be a bit immature and the documentation to be a little lacking. I got a few answers on my forum post but once I properly got my problem across, the answers stopped.

The webtask

Disappointed, I almost gave up until I remembered Webtask.io. This is what Joe Emison had used instead of Lambda and I had heard good things about its parent company, Auth0\. A quick look at their site got my hopes up again. There was even a _free_ plan which limited us to one execution per second, which was fine by me as I wouldn’t expect there to be many crash reports.

Based on the documentation, it looked good, powerful. There was a lot there. Almost too much even; I originally just wanted to spend a few hours on this and host my function, which would be called a “webtask” now. After spending some time with the site, I’d say it’s OK. Some things are hard to get to, but I’m told there is a dashboard in the works.

I had a few little hiccups with their [wt-cli](https://www.npmjs.com/package/wt-cli) CLI module (because I was on Windows) but I had a dummy webtask running online somewhat quickly. My module’s function signature had to refactored a bit to be compatible but once I did that, I uploaded my webtask and triggered it by crashing my Electron app. Then I ran into some problems.

Webtask.io has some pre-installed npm modules but if you use anything outside of those, you’ll need to bundle them into your webtask. To do this, you’ll need their another module; [webtask-bundle](https://www.npmjs.com/package/webtask-bundle). So now instead of just running wt create a.js to publish/update a webtask named a, I needed to run webtask-bundle — output b.js a.js &amp;&amp; wt create b.js — name a.

The bundler uses [Webpack](https://webpack.github.io/) underneath so all it’s doing is traversing the requires and bundling it together into one script. One downside to this is that the native promises from Node.js can no longer be found when Promise is referenced without a Webpack bundle. Webpack must mess with globals or something, I didn’t really look into it. I just used [bluebird](http://bluebirdjs.com/docs/getting-started.html) for promises and quickly moved on. Another downside are that it bundles all dependencies, even the ones I know Webtask.io have. I don’t really mind since my script was still far below the 100KB webtask weight limit.

Running the commands every time I found an issue was becoming tedious. Instead, I started using the Web-based webtask editor (yes, editing the Webpack output). The editor is a good idea, even though it can be buggy and it’s a bit hard to find; there is pretty much no way to navigate to it from the site. It’s handy that you can run your webtask with the click of a button in the editor and watch the real-time logs, especially when your webtask won’t even start like mine wouldn’t.

Side note: there isn’t any real consensus on the best way to work with webtasks. Support for [local debugging](https://github.com/auth0/wt-cli/pull/89) was added recently though.

Once I got around those little problems, I started getting a 400; Script exceeds the size limit. The error is misleading. It doesn’t like that the dump file Electron is sending is 560KB, which shouldn’t be a problem. As I said earlier, webtasks are limited to 100KB and the file is being compared to this by mistake.

One thing I should point out is the Webtask.io has a [Slack channel](https://webtask-chat.slack.com/) where you can receive some much appreciated support. It was pointed out to me there that Webtask.io actually supports [multiple function signatures](https://webtask.io/docs/model) and I should try one of the other options; specifically the one that uses express.

Once I did this, limit error disappeared but I started getting a random error deep in express itself, so I tried another function signature and it worked.

```javascript
module.exports = function(context, req, res) {
  res.writeHead(200, {
  'Content-Type': 'text/html '
  });
  res.end('<h1>Hello, world!</h1>');
}
```

Note: one other thing I should point out is that I needed to disable the Parse body and Merge body options in the settings for my webtask too.

OK, so I got it working. Finally. Here is my webtask:

```javascript
'use strict';
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const raven = require('raven');
const aws = require('aws-sdk');
const Promise = require('bluebird');
const config = {
  sentryDsn: 'TODO',
  s3: {
  accessKey: 'TODO',
  bucket: 'TODO',
  secretAccessKey: 'TODO'
  }
};

var ravenClient, onError;

// req - request {Object}
// Returns a Promise which resolves to an {Object} containing {fields} and {files}
const parseFormData = (req) => {
  return new Promise((resolve, reject) => {
    formidable.IncomingForm().parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      resolve({
        fields: fields,
        files: files
      });
    });
  });
};

// name - {String}
// contents - {String}
// Returns a Promise which resolves to a {String} URL
const uploadDumpToS3 = (name, contents) => {
  aws.config.update({
    accessKeyId: config.s3.accessKey,
    secretAccessKey: config.s3.secretAccessKey
  });
  const s3 = new aws.S3({
    params: {
      Bucket: config.s3.bucket
    }
  });
  return new Promise((resolve, reject) => {
    s3.upload({
      ACL: 'public-read',
      Key: name,
      Body: contents
    }, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data.Location);
    });
  });
};

// context - {Object}
// req - {Object}
// res - {Object}
// Returns a Promise
module.exports = (context, req, res) => {
  onError = (error, options) => {
    if (!ravenClient) {
      ravenClient = new raven.Client(config.sentryDsn, {
        release: options._version
      });
    }

    ravenClient.captureException(error, options);
    res.end('Successfully received crash and sent event to Sentry!');
  }

  return parseFormData(req)
    .then(formData => {
      const payload = {
        tags: formData.fields,
        extra: {}
      };
      const dump = formData.files['upload_file_minidump'];

      if (dump) {
        const contents = fs.readFileSync(dump.path).toString('utf8');
        return uploadDumpToS3(dump.name, contents)
          .then(url => {
            payload.extra[dump.name] = url;
            return payload;
          });
      } else {
        return payload;
      }
    })
    .then((payload) => {
      return onError(new Error(payload.tags.process_type + ' crash'), payload);
    })
    .catch((err) => onError(err, {
      extra: {
        context: context
      }
    }));
};
```

One thing that’s nice is that any error that occurs in the promise chain will also be logged to Sentry.

Next up, look into creating a proper account for Teamwork (instead of using my personal one) and hooking up a nice URL like functions.teamwork.chat. Looking over the site again, it hit me; I missed that Webtask.io’s free plan only allows for “30 days webtask lifetime,” whereas the other plans are unlimited in this respect. The next plan up is $9 per month and it doesn’t support custom domains, so it’s not so cheap after all, eh?

### The conclusion

In the end, I decided we’ll just add an endpoint to our existing API for this. It was an interesting experiment but I’ll leave it at that for now. Overall, I found the services and tools around serverless architecture to be a bit immature and flaky. Keep in mind that I knew very little about it and didn’t want to spend a lot of time on it, but nevertheless it _should_ be that easy.

For this specific use case, there’s probably scope for a Sentry feature where a project can expose a URL which we can POST crash dumps to and events are created in the project. That would be nice.

I didn’t want to come away empty handed so along with writing this, I’ve published my serverless crash reporting function on GitHub at [Teamwork/serverless-crash-reporting](https://github.com/Teamwork/serverless-crash-reporting). Feedback is welcome, this stuff is completely new to me.

I’m not disregarding “serverless” just yet. Last week, [two new Lambda features](https://aws.amazon.com/blogs/aws/new-for-aws-lambda-environment-variables-and-serverless-application-model/) were announced by AWS. I’m going to keep an eye on it and I’m sure I’ll revisit this topic in the future.
