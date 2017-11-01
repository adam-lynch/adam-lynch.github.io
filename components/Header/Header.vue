
<template>
    <header class="header">
          <h1 class="site-title"><a :href="siteUrl" class="site-link">Adam Lynch</a></h1>
          <div class="site-happy-text-wrapper">
            <p class="site-happy-text">
                <span class="site-happy-text-headline">
                    I'm <a :href="siteUrl" class="site-happy-text-headline-link">Adam Lynch</a>.
                </span>

                <span class="site-happy-text-tagline">
                    I like to
                    <a :href="githubAccountUrl" class="site-happy-text-tagline-link js_track-link-clicks">code</a>,
                    <!-- TODO: only go to #writing if on root -->
                    <nuxt-link to="/#writing" class="site-happy-text-tagline-link">write</nuxt-link>, and dabble in design.
                </span>

                <span class="site-happy-text-tagline">
                    I lead <a href="https://www.teamwork.com" class="site-happy-text-tagline-link js_track-link-clicks">Teamwork.com</a>'s next product.
                </span>
            </p>
        </div>

        <navigation/>
    </header>
</template>

<script src="./Header.js"></script>
