
<template>
  <anchor :href="anchorUrl" rel="noopener" :shouldTrackClicks="shouldTrackAnchorClicks" v-if="isAnchor"><slot/></anchor>
  <nuxt-link :to="nuxtLinkTo" v-else><slot/></nuxt-link>
</template>

<script src="./AnchorOrNuxtLink.js"></script>
