
<template>
  <anchor :href="anchorUrl" :shouldTrackClicks="shouldTrackAnchorClicks" v-if="isAnchor"><slot/></anchor>
  <nuxt-link :to="nuxtLinkTo" v-else><slot/></nuxt-link>
</template>

<script src="./AnchorOrNuxtLink.js"></script>
