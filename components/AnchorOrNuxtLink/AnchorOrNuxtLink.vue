
<template>
  <anchor :href="anchorUrl" rel="noopener" :shouldTrackClicks="shouldTrackAnchorClicks" v-if="isAnchor"><slot/></anchor>
  <!-- I was using a nuxt-link here but the link was disappearing once the (client-side) JS kicked in and this fixed it -->
  <anchor @click.native.prevent="navigate" :href="nuxtHref" v-else><slot/></anchor>
</template>

<script src="./AnchorOrNuxtLink.js"></script>
