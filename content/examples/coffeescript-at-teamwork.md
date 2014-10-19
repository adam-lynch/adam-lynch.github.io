---
draft: true
---

This example is taken from a post ([CoffeeScript at Teamwork](http://engineroom.teamwork.com/coffeescript)) which I wrote for Teamwork's [Engine Room](http://engineroom.teamwork.com).

---

The first project at Teamwork to use [CoffeeScript][0] was the [Teamwork.com iPad app][1]. *Fast forward two years*. We now have web, mobile and even desktop apps built with CoffeeScript. If you need a primer, there's no better place than [coffeescript.org][2] where you can learn by example.

## Why bother?

```coffeescript
@customer = customer
    @cart = cart

    $('.shopping_cart').bind 'click', (event) =>
    	@customer.purchase @cart

```

After a glance at the above snippet, it would fair to think of it as just JavaScript with a few superficial changes. There's more to it than that.

> "CoffeeScript" isn't a new programming language, it's a set of abbreviations for writing JavaScript using a standard set of Design Patterns. The generated JavaScript isn't hyper-optimized spaghetti, it's JavaScript, The Good Parts.
>
>
> --- *Reginald Braithwaite, [CoffeeScript is not a language worth learning][3]*

Sure, it provides nice ways of doing some handy things (e.g. multiline strings, interpolation, function binding, classes and more), but the point here is that it subtly makes it difficult to use certain patterns deemed unwise. This is the real value of CoffeeScript.

## Gotchas

A few noteworthy things have caught us out along the way;

- Implicit returns. The last statement in a function is always converted to a `return` statement. This isn't a problem most of the time, but it can be. See this [pull-request][4] I created for the [gulp-rename][5] plugin for a real world example.
- `x = y -1` will effectively be converted to `x = y(-1);` unless you put a space after the minus symbol.
- Ternary / conditional operators are just written as inline if statements; e.g. `w = if x then y else z`. If you wrote `w = x ? y : z`, then it might take a minute to realise that the result of the compilation is actually `w = typeof x !== "undefined" && x !== null ? x : { y: z };`.
- Any properties of a class defined (and given a value) outside the constructor will be static, i.e. the value will be shared / kept in sync with any classes extending this class. The property can be defined outside of the constructor, but if so, needs to initialized with `null` and the actual value set in the constructor.
- The expression `'a' isnt 'b'` is compiled to `'a' !== 'b';` (which evaluates to `true`), but `'a' is not 'b'` is compiled to `'a' === !'b';` (which is `false`).
- There is no such thing as a private method in CoffeeScript. You might read online that using an equals symbol instead of a colon (i.e. `doSomething = ->`) will do it, but no. This is actually just a function defined within the scope of the class (function) but is not bound with the correct value of `this`. So from within this function, an instance method of the class is not accessible (i.e. it would be 'private' but you couldn't call `@differentStandardMethod` from it).

## Coding style

Obligatory quote:

> Programs are meant to be read by humans and only incidentally for computers to execute.
>
>
> --- *H. Abelson and G. Sussman (in "Structure and Interpretation of Computer Programs")*

Consistency and readability are important factors in overall code quality. CoffeeScript already helps in this respect as there is a "CoffeeScript way" to write a lot of things. Also, most JavaScript style guides are dominated by rules for curly braces, which isn't really a problem anymore as they would be few and far between.

We use [CoffeeLint][6] to enforce the remainder. It comes with configurable preset rules (e.g. indentation) and the ability to add custom ones. Our rules (which are completely up for debate with the company) are published to npm as [teamwork-coffeelint-rules][7] which allows any project to easily install them as a dependency.

[Gulp][8], our build system of choice, is built around Node streams. This means we can easily have a *pipeline* where we grab our CoffeeScript files, pass them through [gulp-coffeelint][9], then [gulp-coffeelint-threshold][10] (which I created to give us more granular control over the error reporting) before actually compiling them and putting the result somewhere. So if your code doesn't pass the code style check, an error is thrown and the application isn't even built. This way, it's a lot less likely that non-compliant code ends up under version control / in the application. It's easy to also have this linting as a separate standalone task.

### EditorConfig

Enforcing a code style is great, but now developers would have to configure their IDEs and text-editors to follow some of the same rules, otherwise things would become very tedious as they would get an error every time they change a file. A developer ideally shouldn't have to manually change their settings per project after cloning it; the quicker we get to writing code, the better. So that's where [EditorConfig][11] comes in.

To use EditorConfig, you need to install your editor's [EditorConfig plugin][12] and add a `.editorconfig` file to your project containing, for example, the following:

```
# top-most EditorConfig file
    root = true

    [*]
    charset = "utf8"

    [*.coffee]
    indent_style = space
    indent_size = 4
    trim_trailing_whitespace = true

```

Let's say your editor is set up to use tabs by default instead of spaces. Now if you press tab, your editor will input four spaces. I think it's not worth talking about tabs vs. spaces anymore once you use EditorConfig. *Sidestepping a religious debate*. So now a developer could clone multiple projects with different code styles and easily switch between them without any worry or configuration. Also, it's great that a project's code style is documented and configured *in* the project (and under version control).

## Documentation

Speaking of editors, Github recently released [Atom][13], their open-source text-editor built with CoffeeScript. I had a quick look through the source code and quickly noticed [Biscotto][14], a CoffeeScript documentation generator. To use Biscotto, you need to follow some nice comment conventions (which support Markdown); for example:

```coffeescript
	# Does something to something
    # options - {Object}
    #         :x - {Number}
    #         :y - {Number}
    #         :anotherOption - {Something}
    # element - {HTMLElement}
    # isReady - Optional {Boolean}, defaults to `true`
    # Returns a {Number}
    doSomething: (options, element, isReady = true) ->
    	return 0

```

Then Biscotto can generate a nice [HTML documentation site][15] from that, even linking the `element` argument to the relevant [Mozilla Developer Network][16] entry and `option.anotherOption` to the generated page for the `Something` class.

![Example documentation site][0]

There was no Gulp plugin at the time for Biscotto, so I created [gulp-biscotto][17].

As you might expect, our code hasn't got as many Biscotto comments as we'd like, so we're probably going to create another Gulp plugin which will check your CoffeeScript files for a minimum amount of documentation. This would most likely only be a friendly warning and or belong to a standalone lint task that we'd run every once in awhile.

Also, we're planning to [write a Markdown generator for Biscotto][18] so project documentation (i.e. `README.md`) can be generated from the comments.

## Going forward

CoffeeScript will be used over vanilla JavaScript for future projects, although we've yet to find a nice way of using CoffeeScript in [Knockout][19] templates. We've also discussed using CoffeeScript with types (like a blend of CoffeeScript and [TypeScript][20]), but the jury is still out on that.

If you have any CoffeeScript tips of your own that I've missed here, please feel free to share them in the comments below.
[0]: http://coffeescript.org
[1]: https://www.teamwork.com/ipad
[2]: http://coffeescript.org/
[3]: https://github.com/raganwald-deprecated/homoiconic/blob/master/2011/12/jargon.md
[4]: https://github.com/hparra/gulp-rename/pull/24
[5]: https://github.com/hparra/gulp-rename
[6]: http://coffeelint.org
[7]: https://www.npmjs.org/package/teamwork-coffeelint-rules
[8]: http://gulpjs.com
[9]: https://github.com/janraasch/gulp-coffeelint
[10]: https://github.com/adam-lynch/gulp-coffeelint-threshold
[11]: http://editorconfig.org
[12]: http://editorconfig.org/#download
[13]: https://atom.io/
[14]: https://github.com/gjtorikian/biscotto
[15]: http://gjtorikian.github.io/biscotto/
[16]: https://developer.mozilla.org
[17]: https://github.com/adam-lynch/gulp-biscotto
[18]: https://github.com/gjtorikian/biscotto/issues/57
[19]: http://knockoutjs.com/
[20]: http://www.typescriptlang.org/

[0]: /content/images/2014/Sep/Capture.JPG