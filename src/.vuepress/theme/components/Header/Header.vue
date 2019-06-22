
<template>
    <header class="header">
          <h1 class="site-title"><router-link :to="{ name: '@nuxtjs/blog:index' }" class="site-link">Adam Lynch</router-link></h1>
          <div class="site-happy-text-wrapper">
            <p class="site-happy-text">
                <span class="site-happy-text-headline">
                    I'm <router-link :to="{ name: '@nuxtjs/blog:index' }" class="site-happy-text-headline-link">Adam Lynch</router-link>.
                </span>

                <span class="site-happy-text-tagline">
                    I like to
                    <anchor :href="githubAccountUrl" class="site-happy-text-tagline-link" :shouldTrackClicks="true">code</anchor>,
                    <router-link :to="{ name: '@nuxtjs/blog:index' }" class="site-happy-text-tagline-link">write</router-link>, and dabble in design.
                </span>

                <span class="site-happy-text-tagline">
                    I lead <anchor href="https://www.teamwork.com" class="site-happy-text-tagline-link" :shouldTrackClicks="true">Teamwork.com</anchor>'s next product.
                </span>
            </p>
        </div>

        <navigation/>
    </header>
</template>

<script src="./Header.js"></script>
