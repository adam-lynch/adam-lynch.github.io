---
date: 2019-12-11
tags:
  - TODO
---

## Empathy is not the answer

::: summary
Cennydd Bowles wrote an absolutely fantastic book called [Future Ethics](https://www.future-ethics.com/) which covers... well, yeah... ethics. Aside from teaching essential ethics theory like utilitarianism, deontological, and virtue ethics, it challenges us to build a fairer future. Is it OK to do X as long as no one knows? Or as long as it's done in good faith? What if everyone else is doing it? Or if it's for "the greater good"? Interestingly, no one approach to ethics is right, o*r wrong,* all of the time.
:::

We're given a series of effective questions to challenge ourselves, like "Is this fair behind a 'veil of ignorance'?" I.e. would you think this design is fair even if you didn't know which person in the system you would be?

Those principles and techniques are then used to analyse a host of common problems in present day and emerging technology. From A/B tests, persuasive tech, and surveillance, to facial recognition, autonomous weaponry, and beyond. Everyone in tech should read the book, *twice.*

Notably though, the word "empathy" is absent, until the end of the book that is;

::: quote Cennydd Bowles — Future Ethics
Finally, be sceptical of empathy. Banal overuse has devalued the concept of empathy in design. Of course we should try to understand other people's life experiences, but empathy alone is no shortcut to ethical nirvana.
:::

I've been mulling this over since reading the book and I think I've come to agree with Cennydd.

I happen to be someone who experiences a lot of empathy; I'm sensitive. That's a good and bad thing, I think. Empathy is often said to be a trait of a good manager, but it's often involuntary. 

I find it more difficult than the average person to go to any funeral, for example. It's likely related to tragic deaths in my family during my childhood. I've had friends apologize *to me* when their relative passed away — how embarrassing.

What does empathy even achieve then? What if I hadn't had those experiences? Would that be better or worse overall?

When it comes to product design, empathy can produce good results but it's just a tool in our toolbox which has flaws just like anything else. We need to apply critical thinking, filter its results, seek what has fallen through the cracks, and acknowledge our biases. 

Sometimes it gives us premature satisfaction and results in complacency;

::: quote Cennydd Bowles — Future Ethics
Empathy prompts us to give money to the beggar, but can also convince us we've done our bit, causing us to overlook means of tackling systemic homelessness.
:::

It can also introduce false positives, which can lead to bloat. We try to please each person who requests a feature or feed our egos as we think we understand what they need;

::: quote Thomas Wendt — [Empathy as Faux Ethics](https://www.epicpeople.org/empathy-faux-ethics/)
It becomes an ethical practice designers use to feel better about the potentiality of making superfluous things that no one actually needs.
:::

We need to ask why, why, why. Let's empower people to solve real problems rather than appease symptoms. 

Before introducing any significant change, I'd love to be able to find a metric that illustrates the target problem, along with a rough projected delta the change should bring. This allows us to challenge ourselves (despite sunk costs) and go back to the drawing board if the desired outcome didn't come to fruition.

Now, to the worst unintended consequence of all. We often end up prioritizing some groups of people (people like us) over others who are, well, *others*. [Tatiana Mac](https://www.youtube.com/watch?v=nQq_gZiZ-jg) goes as far to say "Empathy is a scam." If you can't feel for someone else's experience, does that make it less valid? There are too many egregious examples of this, like [hand soap dispensers at Facebook which only recognize white hands](https://twitter.com/nke_ise/status/897756900753891328),

Combine this with survivorship bias and you've got a nice self-perpetuating oversight on your hands. You didn't care about X when building your product, so your customer base is full of people who don't mind, so you never improve it. Why would you? None of your customers want it.

You may be the proud owner of a self-fulfilling prophecy. If you're lucky, someone will tell you (and manage to convince you), but maybe not. User feedback isn't the whole truth and nothing but the truth. Maybe there's a good reason why no one is asking for or uses that feature in your app. Maybe that "good" conversion rate could be "great." Question everything. Nothing is sacred.

To be fair, we don't set out to exclude people. Algorithmic bias is typically unintended, for example. We do our best with the knowledge we have at any given time. We want to deliver something in a reasonable amount of time though, so we have to draw a line somewhere, and empathy can cause us to misplace those lines. We don't know who or what is outside of what we know.

You see, we're lazy; our brains will avoid work where possible. It's easier to solve a problem we have, had, or could have. If we can think of an example use case, we're more likely to believe it will happen frequently.

For example, product teams often disregard "edge cases." We've all been there. Something is a bit awkward to solve and it's not worth it, or so we think. We might even conjure up some statistic like "95% of people probably won't run into this". Then the decision is made to ignore the use case completely or "sort it ~~later~~ never".

The issue is that our perception can be far from reality. That "95%" is only what we can foresee or understand. What if our gut instinct is wrong? What if we're missing something important here? More empathy isn't the answer. It's not feasible to solve everything. We need to stop over-optimising for unimportant cases just because we understand them. We need to dig deeper.

::: quote Whitney Quesenbery
Do we care enough to find out what the experience is of people who are not like us?
:::

Eric Meyer & Sara Wachter-Boettcher's [Design for Real Life](https://abookapart.com/products/design-for-real-life) encourages us to frame some edge cases as "stress cases." We may be "delighting" people like us but what if someone has an emergency? What if they're trying to achieve a task while their job is on the line? Impact can matter more than estimated frequency.

::: quote Eric Meyer & Sara Wachter-Boettcher — Design for Real Life
"Someone trying to shut down their account in a hurry is an edge case."
"Someone trying to shut down their account in a hurry is a stress case."

The first feels like we can ignore it for now [...] The second, by contrast, feels urgent [...]

The truth is, stress cases exist for all kinds of products and services — even ones you likely never associate with a crisis. Here are just a few scenarios that are more common than we'd like to imagine:

- A person who has received a threat from a previously unknown stalker, and needs to delete or make private every public account as quickly as possible.
[...]
:::

The book encourages those who use personas to incorporate stress cases. If we can consider urgent use cases from the beginning, designs will inevitably tend towards a better and more inclusive experience. To borrow another example from Eric and Sara, using plain language in DIY tutorials not only helps tradespeople but also amateurs who are fixing something mid-crisis.

In my experience, it's almost always best to design for the most constrained case first, if possible. Mobile-first responsive design forces you to solve the problem first, exploit surplus pixels later. An app that's fast on a slow device or network connection is going to be fast for everyone (and [make more money](https://wpostats.com/)). A website that works without JavaScript will function for everyone (but [Everyone has JavaScript, right?](https://kryogenix.org/code/browser/everyonehasjs.html))

Similarly, web accessibility is often scoffed at; it's not worth the effort. It won't bring us in many more customers. Let's make something for 90% of people. How much would it improve our bottom line? Blah blah blah... Yet accessibility is good for all;

::: quote https://www.w3.org/WAI/fundamentals/accessibility-usability-inclusion/ W3C WAI
While accessibility focuses on people with disabilities, many accessibility requirements also improve usability for everyone. Accessibility especially benefits people without disabilities who are in limiting situations, such as using the web on a mobile phone when visual attention is elsewhere, in bright sunlight, in a dark room, in a quiet environment, in a noisy environment, and in an emergency.
:::

Speaking of the "bottom line", *what about* the business case? Potentially, a lot of money is being left on the table by excluding people and overly-emphasizing people like us. We could unknowingly be narrowing the market. Catering for those previously excluded could prove to be a differentiator and improve retention.

Needing a business case to validate everything is problematic anyway, but that might be a step too far for some. Sometimes we need to place our values and principles above incomplete data.

It's probably too late anyway. Products and services are typically created to make money. Designers then try to retroactively introduce empathy. Our intentions are good but this again is where we prematurely pat ourselves on the back.

::: Cennydd Bowles — Future Ethics
It can't be unethical; we used empathy!
:::

Should we stop caring? Should we stop listening to customers? Is user-centered design is bad? No. Empathy is certainly useful but it is only a tool that raises awareness. We need to be careful and question its fruit.

We can't have empathy for everyone and we need to remember that. It's like using a mirror. Sure, you can point it at something else but you're always constrained by your perspective and there will always be blind spots.

Dogfooding isn't enough. Having a diverse team is not enough. Analytics can help but data can be flawed or subjective. There is no shortcut or simple answer. We need to make a conscious effort to be curious and open minded. To make the difficult decisions.

Don't get me wrong; I have made all of the above mistakes. I'm not going to pretend to have all of the answers but I hope I've brought up some thought-provoking questions at least.

In the end, empathy in itself doesn't achieve anything. It's the subsequent action that matters.