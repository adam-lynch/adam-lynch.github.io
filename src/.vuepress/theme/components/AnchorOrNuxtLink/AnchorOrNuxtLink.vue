
<template>
  <anchor :href="anchorUrl" rel="noopener" :shouldTrackClicks="shouldTrackAnchorClicks" v-if="isAnchor">
    <slot/>
    <!-- external link icon: -->
    <OutboundLink v-if="shouldShowOutboundIcon"/>
  </anchor>
  <router-link :to="nuxtLinkTo" v-else><slot/></router-link>
</template>

<script src="./AnchorOrNuxtLink.js"></script>
