---
date: 2019-02-02
tags:
  - api
  - open API
  - public API
  - twitter
  - bot
  - zeit
  - now
  - serverless
  - faas
  - node.js
  - cron
---

## How I made the @randomOpenAPI Twitter bot in 42 minutes-ish

In my day job, I'm building a product in which nothing is simple. There's a lot of flexibility, customization, and connected dots. Sometimes I daydream about working on an app which has one page, no settings, customization, or integrations, a single fixed viewport size to worry about, and so on. You know, an empty page.

Seriously, I do love the challenge and I know it will make a lot of people happy. However, I do wonder how quickly I could make something simple from scratch. That's what this project is about.

::: summary

I love APIs. Especially open APIs. I wish there were way more of them. There's a lot of data out there we can't get our hands on. Imagine all of the unborn apps, studies, and infographics.

The natural conclusion was to create a Twitter bot. Have you ever seen Stefan Judis' [@randomMDN](https://twitter.com/randommdn)? It tweets a random article from [MDN](https://developer.mozilla.org/en-US/) multiple times a day. I decided to create one of my own to raise awareness about open APIs. Plus it's an excuse for a small fun project.

:::

I decided to time myself while I was at it. It took 42 minutes but read on, it wasn't all smooth sailing.

#### Hello, world!

I created a new directory with an `index.js` containing `console.log('Hello, world!)` and ran `node index` in the directory.

OK, I managed not to mess that up. Then, I needed data about open APIs. Did you know people make curated lists of these APIs? Did you know there's... of course there's an API to get the list of APIs. Luckily, the [Public API for Public APIs](https://api.publicapis.org/) has a `/random` endpoint. At a glance it had enough information:

- title (string)
- description (string)
- category (string)
- And some other stuff (more about that later).

Looks good. Now, I need to hit the API. I don't necessarily need to use a library but one library is better than two interfaces. I prefer a HTTP client library which supports both client and server-side usage. Axios is my latest library of choice for this. So I ran `npm init --yes && npm install axios` . Then I added the following code to `index.js`:

```javascript
  const axios = require('axios');
  
  axios.get('https://api.publicapis.org/random')
  .then((response) => {
    console.log(response.data);
  })
```

Notice how little effort I'm putting into error handling. I'm on the clock.

Running `node index` resulted in:

```javascripton
{ count: 1,
  entries:
    [ { API: 'Livecoin',
        Description: 'Cryptocurrency Exchange',
        Auth: '',
        HTTPS: true,
        Cors: 'unknown',
        Link: 'https://www.livecoin.net/api',
        Category: 'Cryptocurrency' } ] }
```

### Writing the tweet

Next, I constructed a tweet from the data. Luckily, none of the text is very long and Twitter doubled their tweet character limit to 280. I fiddled around way too long here. This is what I ended up with:

```javascript
const axios = require('axios');
const camelCase = require('camelcase');

const formatHashtag = (text) => {
  return camelCase(text.replace(/[^a-zA-Z0-9]/g, ''));
};

axios.get('https://api.publicapis.org/random')
.then((response) => {
  if(!response.data.entries.length){
    throw new Error('No APIs found');
  }

  // Build tweet content
  const api = response.data.entries[0];
  const isDescriptionShort = api.Description.split(' ').length <= 2;
  let tweet = `📡 Random Open API 📡\n\n${api.API}`; // .API is the name of the API

  // If the description is too short, it's shown as a hashtag later instead
  if(!isDescriptionShort){
    tweet += `: ${api.Description} `;
  }

  tweet += `${api.Link} `;

  const tags = ['openApi', 'api', formatHashtag(api.Category)];
  if(isDescriptionShort){
    tags.push(formatHashtag(api.Description));
  }

  tweet += tags.map(tag => `#${tag}`).join(' ');
  console.log(tweet);
})
```

I didn't like how it looked when the description was short (e.g. `Discogs: Music`). In this case, I used it as a hashtag instead.

### Tweet, tweet!

Next is actually sending a tweet. I did a quick google and ended up running `npm install twitter-lite` . I chose [twitter-lite](https://www.npmjs.com/package/twitter-lite) because:

1. The documentation showed me what I needed to do at a glance.
2. It didn't seem too heavy or outdated.
3. It had `lite` in the name 🤷‍♂️.

I needed the following Twitter credentials to post a tweet: 

- Consumer key.
- Consumer secret.
- Access token key.
- Access token secret.

This is what took the longest in this project. I created the Twitter account, applied for access to [Twitter's APIs](https://developer.twitter.com/), created an app, and got the credentials I needed. I'm not going into too much detail here, it's tedious.

I commented out the Axios call from before and threw in the following:

```javascript
// ...
const Twitter = require('twitter-lite');

const client = new Twitter({
  subdomain: "api",
  consumer_key: "notTheRealValue", // from Twitter.
  consumer_secret: "notTheRealValueEither", // from Twitter.
  access_token_key: "nopeNotReal", // from your User (oauth_token)
  access_token_secret: "hmmNoStillNotReal" // from your User (oauth_token_secret)
});

// ....

client.post("statuses/update", { status: 'Hello, World!' })
.then(() => console.log('Success!'))
```

Once I ran `node index` again, there was a `Hello, World!` tweet in my feed.

Next, I combined the API and Twitter code, then ran it again;

:::figure random-open-api/tweet.png A screenshot of the first Tweet posted (Daum maps).
:::

Isn't it beautiful?

### Now, where to host this?

I thought serverless would be a good fit for hosting this. I'd heard the praise Zeit's [Now](https://zeit.co/now) had gotten so I thought I'd give it a go. It's a serverless hosting platform which supports static files, JavaScript, PHP, Python, Go, and more. 

They have integrations with GitHub and more but I went with the slightly more manual approach. I ran `npm install -g now && now login` and added a `now.json` file;

```javascripton
{
  "version": 2,
  "builds": [{ "src": "*.js", "use": "@now/node" }]
}
```

This tells Now that any JavaScript files should be built with their Node.js builder. 

I had to tweak my `index.js` slightly. First to add their function boilerplate, and secondly to call `res.end` to output something, rather than logging it to the console;

```javascript
// ...

module.exports = (req, res) => { // Zeit boilerplate
  axios.get('https://api.publicapis.org/random')
  .then((response) => {
    // ...
    
    // Tweet, tweet!
    client.post("statuses/update", { status: tweet })
    .then(() => res.end('Success!'))
    .catch((err) => {
      res.end(`Error: ${err.message}\n\n${err.stack}`);
    });
  })
  .catch((error) => {
    res.end(`Error: ${error.message}\n\n${error.stack}`);
  });
};
```

I then ran `now` which is their command for deploying your serverless function. This took a bit longer than I expected to be honest, but to be fair there's probably a lot going behind the scenes to achieve what Zeit provides. 

The result:

```shell
> Deploying ~/Code/random-open-api under notmyreal@email.com
> Using project random-open-api
> https://random-open-api-jdhf89whf3489.now.sh [v2] [in clipboard] [3s]
┌ index.js        Ready               [24s]
└── λ index.js (39.83KB) [bru1]
> Success! Deployment ready [28s]
```

Now gives you a new URL each time you deploy. I went to this URL in my browser and saw "Success!". Yes, it sent the tweet! That was easy.

### Getting secretive

I planned to open source the code and I didn't want to commit my Twitter credentials. First, I needed to create a secret for each so I ran the following commands:

```shell
now secret add CONSUMER_KEY "notTheRealValue"
now secret add CONSUMER_SECRET "notTheRealValueEither"
now secret add ACCESS_TOKEN_KEY "nopeNotReal"
now secret add ACCESS_TOKEN_SECRET "hmmNoStillNotReal"
```

Then I added the following `env` object to my `now.json` file. 

```javascripton
{
  "version": 2,
  "builds": [{ "src": "*.js", "use": "@now/node" }],
  "env": {
    "CONSUMER_KEY": "@consumer_key",
    "CONSUMER_SECRET": "@consumer_secret",
    "ACCESS_TOKEN_KEY": "@access_token_key",
    "ACCESS_TOKEN_SECRET": "@access_token_secret"
  }
}
```

This then allowed me to use `process.env.CONSUMER_KEY` in my function, for example;

```javascript
const client = new Twitter({
  subdomain: "api",
  consumer_key: process.env.CONSUMER_KEY, // from Twitter.
  consumer_secret: process.env.CONSUMER_SECRET, // from Twitter.
  access_token_key: process.env.ACCESS_TOKEN_KEY, // from your User (oauth_token)
  access_token_secret: process.env.ACCESS_TOKEN_SECRET // from your User (oauth_token_secret)
});
```

Now would replace those references with the actual values when deploying. Not too complicated right?

I ran `now` again but this time it didn't work. I got a blank response in my browser. Well, what happened was I somehow managed to type `process.key` , not `process.env` . I went down a rabbit hole trying all sorts of other ways of using environment variables, secrets, `now-env` , and more, before realizing my mistake.

### Automation

I was feeling good. All I had to do was configure Now to run the function on a schedule, publish the code, write and publish the blog post. Profit. 

Well, Zeit doesn't support running things on a schedule :(

At least they don't in Now version 2. I remember there was a bit of talk around the fact they released a backwards incompatible v2. It was forward thinking but had fewer features than v1. I think v1 supported what I needed but I didn't want to start a project by going back in time. 

There were workarounds suggested in GitHub issues like having a `setInterval` in your function. Em, no. I swear, every time I play around with serverless, FaaS, or IoT, an obvious use case isn't covered.

So I gave up on Now. I decided to manually log into Twitter and tweet a few times a day...

I actually settled for a simple but uncomfortable solution. It turns out there's a completely free (and open source) service, [cron-job.org](https://cron-job.org/en/), which will call your URL on a schedule.

:::figure random-open-api/cron.png The job configuration.
:::

All I had to do was sign up, create a job with my URL, and schedule it. As you see, I didn't even have to use the horrible [cron format](http://www.nncron.ru/help/EN/working/cron-format.htm). It was painless.

### Deployment aliases

I realized that if I ever deploy an update, I'll have to log into [cron-job.org](http://cron-job.org) and update the URL. Then I discovered Now's aliases. Individual deployments can be assigned deployments;

:::figure random-open-api/alias.png The create alias modal.
:::

You can choose a [now.sh](http://now.sh) subdomain or give your own domain.

So each time I update the code and deploy, I'll re-assign the alias to the new deployment. There's probably a better way around this but I didn't want to spend too long worrying about it. The code won't need to be updated much and if it ever does, I'd assume the Now dashboard is where it's managed.

### The end

So that's it. It took me 42 minutes in total, including a couple of blunders. Thank you, bye. 

Goodbye!

Hey, stop, why are you still reading?

Ugh, fine...

### Palm, have you met face?

While writing this, I noticed that the API returns more than strictly "open" APIs. Some are, while others require some kind of signup and authentication. I guess I was trying to move too fast.

Looking through results, even the ones which require authentication are still free and publicly available. It doesn't bother me then if they're not 100% "open", the data is still there to use.

Oh wait, no... they're not all free either. The [Semantria API](https://semantria.readme.io/docs) is one entry I just found for example; a "paid Saas text analytics service".

!["Just when I thought I was out, they pull me back in!" from the Godfather](/images/blog-content/random-open-api/godfather.gif)

Looking at the Public API for Public APIs again, they also return an `auth` property for each API. I've seen results with `"auth": "apiKey"`, `"auth": "OAuth"`, and `"auth": ""`. I need to tweet about the last case.

The `/random` endpoint doesn't support filtering, so I'd have to keep calling it until I get one that's open. Hmm.

The `/entries` endpoint does support an `auth` filter parameter but it returns an array of APIs. This looks like my best bet. It doesn't support pagination so it must either return all or at least as many as it can. Here's the new API code:

```javascript
axios.get('https://api.publicapis.org/entries?auth=null')
.then((response) => {
  if(!response.data.entries.length){
    throw new Error('No APIs found');
  }

  // Build tweet content from random result
  const api = response.data.entries[Math.floor(Math.random() * response.data.entries.length)];
```

There's no reason why `/random` couldn't also accept filter parameters. After I publish this, I'll go make a pull-request.

### Conclusion

It was a nice break to rush head first into a small project, hacking something together without reading documentation, properly handling errors, etc. but I don't recommend working like this. It was almost a disaster.

Follow [@randomOpenAPI](twitter.com/randomOpenAPI) on Twitter. Check out the source code at [github.com/adam-lynch/random-open-api](github.com/adam-lynch/random-open-api).

What could you make? I could imagine someone finding value in an account that tweets about *two* random APIs. The mashups might be handy for coming up with project ideas.
