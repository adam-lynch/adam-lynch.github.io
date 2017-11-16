---
date: 2015-10-27
summary: You might have seen Ben Johnson’s tweet. I’m sorry everyone, I’ve made a module which makes this a lot easier to do. It’s called Olc. “Olc” is the Irish word for “bad” and is inconspicious enough to go… 
original:
  blogLink: https://engineroom.teamwork.com
  blogName: Teamwork's Engine Room
  url: https://engineroom.teamwork.com/olc-ruin-someones-day-with-homoglyphs-b14e9a1a05a4
tags:
  - javascript
  - node.js
  - homoglyphs
  - prank
---

## Olc: Ruin someone’s day with homoglyphs

![](/images/blog-content/olc-ruin-someones-day-with-homoglyphs/tweet.png)

You might have seen Ben Johnson’s [tweet](https://twitter.com/benbjohnson/status/533848879423578112). I’m sorry everyone, I’ve made a module which makes this a lot easier to do. It’s called [Olc](https://github.com/adam-lynch/olc). “Olc” is the Irish word for “bad” and is inconspicious enough to go unnoticed if added to a project on the sly.

```javascript
var gulp = require('gulp');
var olc = require('olc');

gulp.task('default', function() { 
  gulp.src('*.js')
    .pipe(olc())
    .pipe(gulp.dest('./output'));
});
```

That's the simplest way to run Olc on some files (with [Gulp](http://gulpjs.com/)). Yay, syntax errors. See [the readme](https://github.com/adam-lynch/olc#basic-usage-without-gulp) for standalone usage if you'd prefer not to use Gulp.

### Options

So only semi-colons are replaced by default as the ~~specification~~ tweet says. For added frustration, any of the following characters can be replaced with homgraphs / homoglyphs: `!`, `(`, `)`, `+`, `,`, `.`, `/`, `:`, `;`, `<`, and `>`.

```javascript
gulp.src('*.js')
  .pipe(olc({ mode: 'all' }))
  .pipe(gulp.dest('./output'));
```

The `mode` option supports three modes so far;

- `greek`: The default.
- `all`: Replace all of the supported characters with homoglyph. Some characters have multiple homographs and one is chosen at random as the replacement each time an occurance is found.
- `one`: Chooses one target character at random and replaces it throughout each file with its homoglyphs. Therefore, each time the code is run, the error and location could change.

Alternatively, you can could pass a `charactersToReplace` option (as a string or array of characters) to explicitly choose how you'd like to inflict the pain.

```javascript
olc({ charactersToReplace: ';)('})// or olc({ charactersToReplace: [';', ')', '('] })
```

### Behind the scenes

Olc handles what should be replaced with what and leaves the real work to [gulp-replace](https://github.com/lazd/gulp-replace) underneath. The most interesting thing was testing this. I like having comprehensive tests for my modules. I like hooking them up to [Travis-CI](https://travis-ci.org) (Linux) and [Appveyor](http://www.appveyor.com/) (Windows) to run the tests on every commit (via GitHub webhook). But how could this be tested?

Testing the `greek` mode is simple as you just need to check the output against a file containing the expected contents, but how can you test the `one` mode? How can you check that a random character of a set is replaced throughout? Keep in mind that each occurrence would be replaced with one of the character's homoglyphs chosen at random. That sounds like a lot of hassle.

Set theory was the answer. Treating each character as a unique element of a set simplifies everything. Each of the following must be confirmed:

- All instances of only one character were replaced.
- The replaced character was a supported target character.
- Every character added must be a homoglyph of the replaced character.

Let's take this code (which contains all possible target characters) as example contents of a file:

```javascript
module.exports = function(){  
  console.log('Tada...!' "<<<");
  var a = 0; 
  a = (a > 2 ? 4 : 5 / 2);  
  return [0, 1];
};
```

Let's assume that all semi-colons were replaced and all of its homoglyphs were used. Here's a Venn diagram:


:::figure olc-ruin-someones-day-with-homoglyphs/venn.png A Venn diagram containing all characters, showing that most of the characters are unchanged.
:::

### All instances of only one character were replaced

Which characters were replaced? That's the characters in the original set which aren't in the new set, also known as the relative-complement of new set in the original, or simply as the difference of the original and new set. This will leave us with the characters from the left-hand side of the diagram. Once the cardinality of the difference is one, then all is ok.

### The replaced character was a supported target character

That's easy. We just need to check if the only element (`;`) in the difference is [one we support](https://github.com/adam-lynch/olc/blob/master/homographs.json).

### Every character added must be a homoglyph of the replaced character

So, now we need to know which characters were added. That's the difference of the new set and the original set, i.e. everything on the right-hand side of the diagram. Once every one of those elements is a homoglyth of the target character, then we've covered everything, so the tests pass.

### The end result

::: figure olc-ruin-someones-day-with-homoglyphs/test-results.png The results of the tests
:::

The `[simplesets](https://github.com/PeterScott/simplesets-nodejs)` module made light work of the set stuff and I also used [mocha](https://mochajs.org/), [should](http://shouldjs.github.io/), and a few other modules for plumbing to implement [the tests](https://github.com/adam-lynch/olc/blob/master/test/index.js). Check out [Olc on GitHub](https://github.com/adam-lynch/olc), feel free to submit a pull-request, or use Olc on someone you know but make sure to blame Ben Johnson.
