---
date: 2020-12-17
tags:
  - map
  - game
  - geocoding
  - geojson
  - coding
  - development
  - project
  - javascript
  - typescript
  - openstreetmap
  - overpass api
  - geometry
  - performance
  - lighthouse
  - geoguessr
---

## Introducing Back Of Your Hand

::: summary

I was sitting at my parents kitchen table with my Dad and uncle, some time pre-COVID. They were throwing Dad Facts™ back and forth about Cork City. Like how Brown's Hill is the shortest hill (it's a short alley with nine steps).

One thing lead to another and I started naming random streets from Google Maps to test them. It didn't matter how obscure I went, one of them would get it instantly. It was honestly really impressive. I know their jobs pre-retirement must've helped, but I'm convinced they were born part human, part map.

And my dad was actually into it. This is a fella who asks "How long will it take?" if you ask him to play a board game. So I decided to code up a game as a Christmas present.

:::

:::figure back-of-your-hand/combined-screenshots.png
:::

[Back Of Your Hand](https://backofyourhand.com) is the result. It's a map-based game where you're given random street names and you have to locate them on the map. The area can be anywhere in the world (it's not limited to Cork or Ireland). You can play solo or [compete with others](https://backofyourhand.com/learn-more#how-to-compete-with-friends-or-family) using multiple phones / computers.

He doesn't know yet, so keep it between us and the Internet please. Feel free to give a go though. Warning: it's tough (unless you're from somewhere where the streets are numbered).

I'll be delighted if he spends even a few minutes playing, but it was also a good little side project for me;

- I had to learn a few new skills to build it.
- I learned a lot about my area.
- A nice side-effect is that it might help my dad understand what I do (rather than just "computers").

From the outset, I especially wanted to make sure that:

- It would work on as many devices possible. Whether that's a phone, tablet, or laptop, using a mouse, trackpad, or touchscreen.
- People who weren't tech-savvy could use it.
- It didn't require the world's highest network speeds to play.
- It wouldn't be too expensive to make / run (I'm talking about money here, not time).

## Non-starters

But I wasn't even sure it would be possible. Geocoding, GeoJSON, and all map-related coding was new to me. The dealbreakers for me were if I couldn't:

- Show and customize a map, for cheap / free.
- Get the street data, for cheap / free. I.e. get a list of a streets for a given area so I could chose random ones. This is more than the name though; I'd need to know the shape and coordinates too.
- Draw / highlight the street on the map after you've made your guess.
- Easily calculate and draw the distance between your guess and the street. I.e. which point on the street (even if it's shaped like an "S") is the nearest point to your guess and how far away is it?

So the first thing I did was look into each of those and found that, yep, they were all possible. I was able to get the map imagery and data from OpenStreetMap. Bonus: I also figured out how to show and hide street names on the map.

## Design

I tried to make it as simple as possible to use and even wrote some documentation to help people play if they need it, e.g. it explains how to zoom in and out of the map on a touchscreen;

:::figure back-of-your-hand/docs.png A snippet of the documentation page
:::

I've always wanted to try a bottom-anchored design, so I took my chance. By default, the "context panel" is on the bottom of the screen near your fingers:

:::figure back-of-your-hand/context-panel-at-bottom.png
:::

Once the screen is large enough / the aspect ratio allows it, the context panel is placed on the left-hand side:

:::figure back-of-your-hand/context-panel-at-side.png
:::

Side note: I use CSS Grid to achieve this. If CSS Grid isn't supported, the context panel stays above the map;

:::figure back-of-your-hand/context-panel-at-top.png
:::

## Geolocation

You might wonder why the area defaults to Cork (Ireland), and not where you are. I thought that using the browser's built-in Geolocation API (which triggers one of those permission prompts) would add too much [friction / hassle](https://adamlynch.com/improve-permissions-ux).
I could've used a third-party API to look up your location based on your IP address. That means there would have to be a loading screen when you open the site. To make it worse, the location wouldn't even be that accurate (off by 100km+).

So I decided to keep it simple. If someone can't locate their city on a map, this might not be the game for them anyway? Plus you only need to do it once; it'll be saved for next time.

## The 'Lioscarrig Drive problem'

At one stage in this project, I was really enjoying the maths side of it, probably a bit too much. Here's an example.

I thought it didn't matter if the street was shaped like an "S", the street data would describe it correctly. However, one time when I made a correct guess, the game said it wasn't and then highlighted another stretch of the same road.

Hmm. It turns out that sometimes a street can be broken into multiple streets in the data, even if it's a straight road. I'm not sure why.

The desired result is that when a random street is selected by the program, all segments and points are included, so it can be correctly drawn on the screen and the distance can be measured accurately.

One solution could be to include any streets that join it which have the same name. However, in some cases, the streets don't overlap but have endpoints that are right next to each other.

You could extend that to grab streets that would be touching if they were moved by a couple of metres, i.e. almost touching streets. This is a little bit annoying (you'd need to move each street in a few directions) but I guess it works.

:::figure back-of-your-hand/parnell-bridge-etc.png Dad Fact™️: Parnell Bridge is the only place in Cork City where you drive on the wrong side of the road. It's because it's surrounded by one-way systems.
:::

There's another problem it doesn't solve though. Imagine a large road where there's two parallel lanes and a huge median. They might be separated into separate streets in the data and are not touching or almost touching.

You could draw a rectangle around the street, expand it by N metres, and then include any same-named streets that intersect it.

That works, but it's no match for Cork City. No matter what you do, it'll find a way out. E.g. here's the Commons Road (it was formerly one road).

:::figure back-of-your-hand/commons-road.png There are 13 segments in OpenStreetMap for "Commons Road" in Cork City.
:::

At the end of the day, the user doesn't know or care about the data, all they're given is the name. It would be pretty frustrating to correctly place a marker on the Commons Road for the game to say "Not _that_ Commons Road".

So when a random street is selected, I include all streets / segments with the same name, even if it's at the other side of the city. If your guess is close enough to any street with that name, you'll get some points.

## Tech stack

I managed to build this in a way that basically costs me nothing. Everything is client-side. All third-party APIs are free / rate-limited and since it's client-side, users will never hit those limits, especially with the caching I do (HTTP and localStorage).

Call it what you like (serverless, jamstack, etc.) but it's basically a simple web site hosted on Netlify (deployed to a CDN, etc.).

As far as JavaScript goes, I've used Svelte with a sprinkle of TypeScript. I've always wanted to try Svelte, and yep, it's good. I could be wrong but the TypeScript integration doesn't seem very deep.

I've used TypeScript to define some models, but not necessarily enforce them everywhere. It was most useful when passing coordinates around between OpenStreetMap and third-party libraries, because each had a different way of representing them.

I used [Leaflet](leafletjs.com/) for the map component as well as some [Turf](https://github.com/Turfjs/turf) utilities. The map tiles are loaded in from two OpenStreetMap tile providers (one with street names, one without). I got the street data (names and shape data) from OpenStreetMap's Overpass API. I had to learn the Overpass Query Language for this but in the end, my query isn't too complicated (more about that later).

I didn't find the need for a CSS preprocessor (there isn't much CSS). Although I did throw in PostCSS / autoprefixer at the end to handle vendor-prefixes automatically.

Doing it all client-side worked out well for my pocket and it was a fun challenge but it is limiting. I can't introduce a leaderboard for example.

## How can people play together if there's no server?

The way this works is that after a game is started, the URL is updated to contain the coordinates of the area center and a random string (e.g. `/51.89774,-8.47017/CJVJVU`). This random string is used as a seed in a custom random number generator.

If someone else opens that same URL, the same seed (from the URL) is used. This means that the random number generator will output the same sequence of numbers and therefore the same random streets (in the defined area) will be selected.

Side note: five decimal points is more than enough precision in coordinates.

## Performance and accessibility

I did my best here but it's a map application, there's a limit to how fast and accessible it can be. Especially when there are third-parties involved and I can't control all of the parts.

### Performance

I did a lot of the typical stuff;

- Minimized HTTP requests.
- Minimized number of domain lookups.
- Preload, prefetch.
- Optimized query times.
- Reduced payload sizes.
- Cache (CDN, HTTP, ServiceWorker, and LocalStorage).
- Inlined SVG (debatable?)
- I chose not to preload the street data. I wait until you click start, but if the area / query hasn't changed from last time, it's cached.

These are the best scores I got from Lighthouse:

:::figure back-of-your-hand/lighthouse-desktop.png Full marks on desktop in everything except "Best practices" (93). This is due to map tile image sizes.
:::

:::figure back-of-your-hand/lighthouse-mobile.png Same as desktop except "Performance" is down to 96.

I'm under no illusion, Lighthouse isn't perfect and can be fooled. The performance score changes nearly every time I run it. For all I know, some of the map tile requests might be too late to be recorded by Lighthouse for example.

### Accessibility

Like I said earlier, I had non-tech savvy users in mind, and even created a guide for them explaining how to play the game, how to zoom on the map, etc. I used semantic HTML, used high contrast colours, and got full marks from aXe (as well as Lighthouse).

I'm sure there is something to improve though, I'm not an accessibility expert. Please let me know if there is. I know that work has been put in to make leaflet (the map component) as accessible as possible.

I didn't do much as far as focus management goes and instead put in some (visually) hidden links to help the user jump back and forth. I didn't want to be to get it wrong / be too controlling. But then again, it is a map? Again, not an expert, open to suggestions.

### Speeding up the Overpass query

At one stage I had the following query:

```
[out:json];
way(around:2500,51.89854,-8.47029)[highway][name];
out geom;
```

This query uses the Overpass Query Language, rather the original "Overpass XML". You can paste this query into [Overpass Turbo](https://overpass-turbo.eu/) to try it out yourself and see the results on a map. The actual request sent by the app would look like this:

```
https://www.overpass-api.de/api/interpreter?data=[out:json](way(around:around:2500,51.89854,-8.47029)[highway][name];);out%20geom;
```

The query says please find any roads / streets with a name, within 2.5km of a certain point. Oh, and I'd like a JSON response, but please include the geometry points for any matches too.

This did the job but it was... slow. 19-24 seconds kind of slow.

The most impactful change was to set a global bounding box for the query. I.e. to begin with, don't consider anything outside of this box. I grab a square bounds of the chosen (circular) area for this.

Another small improvement was to get to more specific on what to return, which lightened the response payload (I really only needed the name and geometry points).

This is what the final query looks like:

```
[out:json];
[bbox:51.92102304014794,-8.506725985901147,51.87605695985202,-8.433854014098872];
way(around:2500,51.89854,-8.47029)[highway][name];
out tags geom;
```

This brought it down to 100 - 250 milliseconds.

## Resources

If you're interested in this kind of thing, check these out;

- [OpenStreetMap Wiki](https://wiki.openstreetmap.org/wiki/Main_Page).
- [Overpass Turbo](https://overpass-turbo.eu/).
- [Nominatim](https://nominatim.openstreetmap.org/ui/search.html): A search engine for OpenStreetMap data.
- [geojson.io](http://geojson.io): Handy for testing out any GeoJSON feature(s) you have. Paste in the GeoJSON and it'll draw it on the map.
- [Leaflet](leafletjs.com/).
- [Turf](https://github.com/Turfjs/turf): Some GeoJSON / map utilities (from the MapBox team I think).

## Source code

See [adam-lynch/back-of-your-hand](https://github.com/adam-lynch/back-of-your-hand).
