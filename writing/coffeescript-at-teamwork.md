---
date: 2014-09-26
summary: The first project at Teamwork to use CoffeeScript was the Teamwork.com iPad app. Fast forward two years. We now have web, mobile and even desktop apps built with CoffeeScript. If you need a primer, there’s no better place… 
original:
  blogLink: https://engineroom.teamwork.com
  blogName: Teamwork's Engine Room
  url: https://engineroom.teamwork.com/coffeescript-at-teamwork-e596eed63590
tags:
  - coffeescript
  - teamwork
  - development
---

## CoffeeScript at Teamwork

The first project at Teamwork to use [CoffeeScript](http://coffeescript.org) was the [Teamwork.com iPad app](https://www.teamwork.com/ios). _Fast forward two years_. We now have web, mobile and even desktop apps built with CoffeeScript. If you need a primer, there’s no better place than [coffeescript.org](http://coffeescript.org/) where you can learn by example.

### Why bother?

```javascript
@customer = customer
@cart = cart

$('.shopping_cart').bind 'click', (event) => @customer.purchase @cart
```

After a glance at the above snippet, it would fair to think of it as just JavaScript with a few superficial changes. There's more to it than that.

::: quote https://github.com/raganwald-deprecated/homoiconic/blob/master/2011/12/jargon.md Reginald Braithwaite, [_CoffeeScript is not a language worth learning_](https://github.com/raganwald-deprecated/homoiconic/blob/master/2011/12/jargon.md)
"CoffeeScript" isn't a new programming language, it's a set of abbreviations for writing JavaScript using a standard set of Design Patterns. The generated JavaScript isn't hyper-optimized spaghetti, it's JavaScript, The Good Parts.
:::

Sure, it provides nice ways of doing some handy things (e.g. multiline strings, interpolation, function binding, classes and more), but the point here is that it subtly makes it difficult to use certain patterns deemed unwise. This is the real value of CoffeeScript.

### Gotchas

A few noteworthy things have caught us out along the way;

- Implicit returns. The last statement in a function is always converted to a `return` statement. This isn't a problem most of the time, but it can be. See this [pull-request](https://github.com/hparra/gulp-rename/pull/24) I created for the [gulp-rename](https://github.com/hparra/gulp-rename) plugin for a real world example.
- `x = y -1` will effectively be converted to `x = y(-1);` unless you put a space after the minus symbol.
- Ternary / conditional operators are just written as inline if statements; e.g. `w = if x then y else z`. If you wrote `w = x ? y : z`, then it might take a minute to realise that the result of the compilation is actually `w = typeof x !== "undefined" &amp;&amp; x !== null ? x : { y: z };`.
- Any properties of a class defined (and given a value) outside the constructor will be static, i.e. the value will be shared / kept in sync with any classes extending this class. The property can be defined outside of the constructor, but if so, needs to initialized with `null` and the actual value set in the constructor.
- The expression `'a' isnt 'b'` is compiled to `'a' !== 'b';` (which evaluates to `true`), but `'a' is not 'b'` is compiled to `'a' === !'b';` (which is `false`).
- There is no such thing as a private method in CoffeeScript. You might read online that using an equals symbol instead of a colon (i.e. `doSomething = -&gt;`) will do it, but no. This is actually just a function defined within the scope of the class (function) but is not bound with the correct value of `this`. So from within this function, an instance method of the class is not accessible (i.e. it would be 'private' but you couldn't call `@differentStandardMethod` from it).

### Coding style

Obligatory quote:

:::quote H. Abelson and G. Sussman, Structure and Interpretation of Computer Programs
Programs are meant to be read by humans and only incidentally for computers to execute.  
:::

Consistency and readability are important factors in overall code quality. CoffeeScript already helps in this respect as there is a "CoffeeScript way" to write a lot of things. Also, most JavaScript style guides are dominated by rules for curly braces, which isn't really a problem anymore as they would be few and far between.

We use [CoffeeLint](http://coffeelint.org) to enforce the remainder. It comes with configurable preset rules (e.g. indentation) and the ability to add custom ones. Our rules (which are completely up for debate with the company) are published to npm as [teamwork-coffeelint-rules](https://www.npmjs.org/package/teamwork-coffeelint-rules) which allows any project to easily install them as a dependency.

[Gulp](http://gulpjs.com), our build system of choice, is built around Node streams. This means we can easily have a _pipeline_ where we grab our CoffeeScript files, pass them through [gulp-coffeelint](https://github.com/janraasch/gulp-coffeelint), then [gulp-coffeelint-threshold](https://github.com/adam-lynch/gulp-coffeelint-threshold) (which I created to give us more granular control over the error reporting) before actually compiling them and putting the result somewhere. So if your code doesn't pass the code style check, an error is thrown and the application isn't even built. This way, it's a lot less likely that non-compliant code ends up under version control / in the application. It's easy to also have this linting as a separate standalone task.

### EditorConfig

Enforcing a code style is great, but now developers would have to configure their IDEs and text-editors to follow some of the same rules, otherwise things would become very tedious as they would get an error every time they change a file. A developer ideally shouldn't have to manually change their settings per project after cloning it; the quicker we get to writing code, the better. So that's where [EditorConfig](http://editorconfig.org) comes in.

To use EditorConfig, you need to install your editor's [EditorConfig plugin](http://editorconfig.org/#download) and add a `.editorconfig` file to your project containing, for example, the following:

```
# top-most EditorConfig file
root = true
[*]
charset = "utf8";

[*.coffee]
indent_style = space
indent_size = 4
trim_trailing_whitespace = true
```

Let's say your editor is set up to use tabs by default instead of spaces. Now if you press tab, your editor will input four spaces. I think it's not worth talking about tabs vs. spaces anymore once you use EditorConfig. _Sidestepping a religious debate_. So now a developer could clone multiple projects with different code styles and easily switch between them without any worry or configuration. Also, it's great that a project's code style is documented and configured _in_ the project (and under version control).

### Documentation

Speaking of editors, Github recently released [Atom](https://atom.io/), their open-source text-editor built with CoffeeScript. I had a quick look through the source code and quickly noticed [Biscotto](https://github.com/gjtorikian/biscotto), a CoffeeScript documentation generator. To use Biscotto, you need to follow some nice comment conventions (which support [Markdown](https://adamlynch.com/markdown)); for example:

```coffeescript
# Does something to something
# options - {Object}
# :x - {Number}
# :y - {Number}
# :anotherOption - {Something}
# element - {HTMLElement}
# isReady - Optional {Boolean}, defaults to `true`
# Returns a {Number}
doSomething: (options, element, isReady = true) ->
  return 0
```

Then Biscotto can generate a nice [HTML documentation site](http://gjtorikian.github.io/biscotto/) from that, even linking the `element` argument to the relevant [Mozilla Developer Network](https://developer.mozilla.org) entry and `option.anotherOption` to the generated page for the `Something` class.

:::figure coffeescript-at-teamwork/biscotto-output.jpg The output
:::

There was no Gulp plugin at the time for Biscotto, so I created [gulp-biscotto](https://github.com/adam-lynch/gulp-biscotto).

As you might expect, our code hasn't got as many Biscotto comments as we'd like, so we're probably going to create another Gulp plugin which will check your CoffeeScript files for a minimum amount of documentation. This would most likely only be a friendly warning and or belong to a standalone lint task that we'd run every once in awhile.

Also, we're planning to [write a Markdown generator for Biscotto](https://github.com/gjtorikian/biscotto/issues/57) so project documentation (i.e. `README.md`) can be generated from the comments.

### Going forward

CoffeeScript will be used over vanilla JavaScript for future projects, although we've yet to find a nice way of using CoffeeScript in [Knockout](http://knockoutjs.com/) templates. We've also discussed using CoffeeScript with types (like a blend of CoffeeScript and [TypeScript](http://www.typescriptlang.org/)), but the jury is still out on that.

If you have any CoffeeScript tips of your own that I've missed here, please feel free to share them in the comments below.
