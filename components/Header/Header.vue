
<template>
    <header class="header">
          <h1 class="site-title"><nuxt-link :to="{ name: '@nuxtjs/blog:index' }" class="site-link">Adam Lynch</nuxt-link></h1>
          <div class="site-happy-text-wrapper">
            <p class="site-happy-text">
                <span class="site-happy-text-headline">
                    I'm <nuxt-link :to="{ name: '@nuxtjs/blog:index' }" class="site-happy-text-headline-link">Adam Lynch</nuxt-link>.
                </span>

                <span class="site-happy-text-tagline">
                    I like to
                    <anchor :href="githubAccountUrl" class="site-happy-text-tagline-link" :shouldTrackClicks="true">code</anchor>,
                    I like to
                    <nuxt-link :to="{ name: '@nuxtjs/blog:index' }" class="site-happy-text-tagline-link">write</nuxt-link>.
                </span>

                <span class="site-happy-text-tagline">
                    Developer, author. Currently at <a href="https://readwise.io">Readwise</a>.
                </span>
            </p>
        </div>

        <navigation/>
    </header>
</template>

<script src="./Header.js"></script>
