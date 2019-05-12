---
date: 2019-05-12
tags:
  - css grid
  - css
  - javascript
  - table
  - data
  - responsive design
  - responsive
  - flexbox
  - resize column
  - web app
  - development
  - crm
  - sales
---

## Flexible data tables with CSS Grid

::: summary

Now that we've launched, I can finally talk about the secret project I've been working on for the last two years. One interesting piece of the [Teamwork CRM](https://www.teamwork.com/crm) puzzle was the "list view". 

It's a powerful page component which exists seven times in the app — a table on steroids essentially. I could talk about it for days but I won't bore you. I'll focus on how we added a lot of flexibility with a few lines of CSS (Grid). Namely, how we lay out data-heavy tables, how we support resizing of columns, and more.

:::


First, I need to give some more context, starting with the purpose and design goals of these screens. Feel free to [skip to the CSS Grid bit](#just-get-to-css-grid-already).

:::figure flexible-data-tables-with-css-grid/wide3.png The leads list view.
:::

Primarily it allows salespeople to scan a list of items like their leads or contacts, and find anything important they need to take action on. It's not like an Excel spreadsheet — we can do a better job at laying out the data, which there will be a lot of.

Everything we do is responsively designed. We start with the most narrow / constrained variant first and tweak the layout based on content, design, use cases (we don't have device-orientated breakpoints). 

At its most minimal, the columns are stacked vertically within rows, spanning the full width of the screen. 

:::figure flexible-data-tables-with-css-grid/narrow.png What a list view looks like on a narrow screen.
:::

Responsive tables are tricky. There are [several existing patterns](https://bradfrost.github.io/this-is-responsive/patterns.html) you could pick from. Consider what your users are trying to achieve and choose wisely. 

Once we have enough pixels in our canvas to play with, we switch to a more typical table layout such that the columns are... well, columns. There are no major layout changes beyond this point but we still want to display the columns as best as we can for the salesperson viewing it.

Assume there are a lot of columns (we'll look at how the user can configure the columns in more detail later). The table should fill the width of the screen (at least). Column widths then should be determined by their content and the type of values they contain; e.g. short / long text, date, number, URL, etc. Date columns should take up less room than long text columns. 

Columns must have a minimum width and therefore only so many can fit into the viewport. As a result this table will be vertically and horizontally scrollable for a lot of salespeople.

:::figure flexible-data-tables-with-css-grid/resizing-window.gif How the layout varies per window width. Sorry the GIF is a bit janky, I provide some interactive examples below.
:::

To begin with, we lay the table out as best we can using regular old-school table-layout CSS. Next, I'll show you how we enhance it with CSS Grid. Following that, how we leverage Grid to allow users to resize columns, which would be a lot more awkward with regular table-layout CSS.

## Just get to CSS Grid already

I'm no CSS Grid expert but I love it. It's extremely powerful and simple, allowing you to implement previously tricky layouts with minute amounts of code. I'll skip giving an introduction to Grid in this article. Go read Rachel Andrew's [The New CSS Layout](https://abookapart.com/products/the-new-css-layout) or [A Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) and when you're done wondering where Grid was all your life, come back to me.

The first thing we do is apply `display: grid` to the `<table>` to make it a grid. This won't break anything if the browser doesn't support it (it will carry on using `display:table`). Its children become grid items; the `<thead>` and `<tbody>`. It's not the `<thead>`, `<tbody>`, or even the `<tr>`s we're concerned with though. What we want to do is lay out our `<th>`s and `<td>`s on this grid. We could apply `display: grid` to each of these too (i.e. grids within grids), but that's not ideal. Each `<tr>` grid would be independent of others and that's not good (you'll see later that I had the same problem with Flexbox).

A workaround is to use `display: contents` on the `<thead>`, `<tbody>`, and `<tr>`s. This basically removes the them from the Grid layout, bypassing them, and promotes their children (the `<th>`s and `<td>`s) to participate in the the `<table>` grid instead. 

Then we use the magic `grid-template-columns` to control the grid items. Yes, one line of CSS. For example, if we had one date column and one URL column, it might be something like:

```css
grid-template-columns: minmax(150px, 1.33fr) minmax(150px, 2.33fr);
```

We use the same minimum size for all columns but the max (`fr`) value is determined by the column data type. I tried using Grid's`auto` and `max-content` too but what we've ended up with seems to produce the best result.

Here is a simplified example:

<p class="codepen" data-height="390" data-theme-id="light" data-default-tab="result" data-user="adam-lynch" data-slug-hash="XwKWdG" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Flexible data table with CSS Grid">
  <span>Something went wrong. View <a href="https://codepen.io/adam-lynch/pen/XwKWdG/" target="_blank">
  Flexible data table with CSS Grid</a> by Adam Lynch (<a href="https://codepen.io/adam-lynch">@adam-lynch</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

You should <a href="https://codepen.io/adam-lynch/debug/XwKWdG" target="_blank">open it in a new tab</a> as it's a bit constrained embedded here like this. Then try resizing the window.

## Resizing columns with Grid

On top of this, we support reordering, resizing, and toggling which columns are shown. The lists of possible columns are long, including properties of the item (e.g. leads) itself, properties of related items (e.g. the company linked to the lead), and custom fields. 

For example, a user could create a (date) custom field for contacts called "Date of birth" so that can be tracked in the system for each contact. 

Since a type like "Date" is selected when creating a custom field, our system already handles custom fields. There's more to think about when columns are toggled, but first I need to explain how resizing works.

1. The user hovers over a column header, a resize handle is shown on the right hand side. We're listening for `mousedown` on the resize handle.
2. When the user clicks the handle, we bind some more `mousemove` and `mousedown` event listeners (to the `window`). We also add some classes for decoration at this point.
3. When the user moves their mouse, we calculate the new column width. This takes the cursor position, the table's scroll position, and our minimum into account. Then we re-set the `<table>`'s `grid-template-columns`s rule (via `style` attribute), this time replacing the max (`fr`) value with a pixel value. For example, `grid-template-columns: minmax(150px, 1.33fr) 296px;`. We do this using `requestAnimationFrame` to keep it as smooth as possible.
4. When `mouseup` is fired, we unbind event listeners and remove classes.

Try this simplified example (or ideally <a href="https://codepen.io/adam-lynch/pen/GaqgXP" target="_blank">open it in a new tab</a>):

<p class="codepen" data-height="390" data-theme-id="light" data-default-tab="result" data-user="adam-lynch" data-slug-hash="GaqgXP" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Flexible data table with CSS Grid (resizable columns with good UX)">
  <span>Something went wrong. View <a href="https://codepen.io/adam-lynch/pen/GaqgXP/" target="_blank">
  Flexible data table with CSS Grid (resizable columns with good UX)</a> by Adam Lynch (<a href="https://codepen.io/adam-lynch">@adam-lynch</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

What's great here is that we only need to update one element in the DOM, not each cell.

We always build with touch users in mind, but it's OK not to support this via touch. It's a very precise action. Even if I wanted to resize a column using touch, I'd probably expect a different interaction, like a multi-touch spread gesture.

## Fixed column widths

You might have noticed I didn't tell the whole truth. Not only do we "fix" the width of the column you're resizing, we make all column widths fixed. Maybe you didn't even notice, because that's exactly how it should work.

I originally thought that users would like that when they stretched or squeezed columns, the other ones could adjust too. If the columns filled the screen width nicely and you make one smaller, one (or some) of the others could grow if they had more content to show. Try this example for yourself below (or ideally <a href="https://codepen.io/adam-lynch/pen/wbWvep" target="_blank">open it in a new tab</a>):

<p class="codepen" data-height="390" data-theme-id="light" data-default-tab="result" data-user="adam-lynch" data-slug-hash="wbWvep" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Flexible data table with CSS Grid (resizable columns with bad UX)">
  <span>Something went wrong. View <a href="https://codepen.io/adam-lynch/pen/wbWvep/" target="_blank">
  Flexible data table with CSS Grid (resizable columns with bad UX)</a> by Adam Lynch (<a href="https://codepen.io/adam-lynch">@adam-lynch</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p> 
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

After some user testing, it was clear this is unexpected behaviour. As a user, I feel less in control when there are unpredictable side-effects to my actions. 

We shouldn't make assumptions based on which column was or wasn't interacted with. When resizing one column, a user could have already made an implicit decision that the rest were perfect.

Therefore, if you open the app for the first time, the columns are laid out as best as possible. If you resize your screen, they resize using the same ratios. Once you touch the resize handler of any column, all of the visible columns become fixed width.

:::figure flexible-data-tables-with-css-grid/resizing-columns.gif Before, during, and after resizing a column. Sorry the GIF is a bit janky.
:::

Once someone takes the time to tailor the screen to their needs, we take note. Any time a column is resized or made fixed, we create an independent localStorage entry mapping a column identifier to a pixel value.

I can't remember exactly why we decided to set the fixed value using pixels, rather than something more fluid. Maybe it was just to keep it simple. Maybe it's because we do actually fall back to using a more archaic approach to setting column widths if Grid and `display: contents` aren't supported. You don't have to do this, it would have been too important to leave out for our users.

Using something fluid probably wouldn't align with the user's intentions anyway. We can't assume that making all columns smaller in order to keep more of them in the screen is the most important thing. If they had resized a column, it's to see a certain amount of content in that column. If we used a fluid unit, and then they made the screen narrower, we'd be disregarding the choice they made. They'd have to resize the column again to see the same content. Users are unlikely to be thinking "Hmm, I want this column to take up 20% of the window even if I resize it". Anyway, users rarely resize windows; I'm going into too much detail on an edge case here.

## Toggling columns

:::figure flexible-data-tables-with-css-grid/manage-columns.png Our modal for customizing which columns are shown.
:::

Imagine a salesperson has changed the column set using the above modal. If none of the chosen columns have been resized previously, they get laid out using the default `grid-template-column` values depending on their data type. For example, `minmax(150px, 3.33fr)`.

If any of the columns has a fixed width stored in localStorage, we make *all* of the chosen columns fixed width (and store those widths in localStorage too).

Over time, more and more columns will become fixed. The only way for users to get back to fluid columns is if they were to reset the columns.

We also store an array of column identifiers in localStorage, separate to the column width entries.

## "Why didn't you just use {{ libraryName }}?"

I didn't want to just offload the problem to a heavy JavaScript library. It would be heavy, janky, wouldn't be responsive, and might not even use `<table>` at all. I also didn't want to write something like that myself. There must be a better way, I thought.

## "Why didn't you just use Flexbox?"

Each row would be evaluated / spaced independently of each other. A column might not be aligned with the column above it because of varying content length.

I could have switched to `<div>`s representing the column containing the vertically stacked cells within. I didn't want to have to do this though. I wanted to use a `<table>`. On top of that, I could have easily ran into issues from the reverse angle anyway, like cells not matching in height across columns.

## "Why didn't you just use a `<colgroup>`?"

Check out [`<colgroup>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/colgroup), it's a handy old element. Once you define your columns using `<col>`s, styles applied to one will effectively be applied to all of the cells in that column. 

In the end though, it was simply too limited for what I needed to do. It didn't take long to realise it was a no-go. So much so, that I can't remember exactly what the problems were. I'm pretty sure it was impossible to achieve the level of fluidity I wanted, and it didn't work well with Flexbox or Grid.

## "Why didn't you just use table-layout: fixed?"

I could have use `table-layout: fixed` on the `<table>` and set the column widths using percentages. However, from looking at examples and playing around, this only seems to work if the table is 100% in width. Also resizing one column causes the other columns to resize to fill the 100% width.

## "But you could still have used a table!"

Yes, tables can do a lot of smart things out of the box, but they can't efficiently support everything I wanted to do. Still disagree? OK you wizard, teach me.

## Don't go overboard with display: contents

`display:contents` allowed us to keep our table markup. Use it only when you really have to though. There is, or at least were, issues in some browsers around accessibility and how screen readers would read the content. 

We discovered a [strange bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1550728) when combining it with native drag & drop in Firefox.

Fortunately, subgrid on the way which will properly allow descendants to participate in grids. Our use case is simple in that we want to effectively flatten the markup but subgrid will open the door for wilder multi-dimensional grid orgies. See [Why display: contents is not CSS Grid Layout subgrid](https://rachelandrew.co.uk/archives/2017/07/20/why-display-contents-is-not-css-grid-layout-subgrid/).

## I'm probably forgetting something

There's a lot more to this screen. I think there was some text-overflow issue when resizing columns but I can't remember anymore. 

We use `position: sticky` to keep the table headers in place as you scroll down. It's a lovely enhancement and it degrades nicely. However, we do have a JavaScript fallback for IE11 users. I really wouldn't recommend doing that. It's tricky to achieve with horizontally scrollable tables.

I didn't even touch on all of the features of these list views. Users can apply, save, and share custom filters (e.g. show me leads over $500 or where the contact is in Europe). These column filters can be set to remember the column set you had when you created them, because you might always want to see certain columns for a given workflow.

We'll soon support bulk editing via the list view, as well exporting your tailored view to CSV.

Anyway, thanks for reading.
