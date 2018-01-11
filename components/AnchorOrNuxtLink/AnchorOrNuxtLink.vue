
<template>
  <!-- <anchor :href="anchorUrl" rel="noopener" :shouldTrackClicks="shouldTrackAnchorClicks" v-if="isAnchor"><slot/></anchor>v -->
  <a :href="resolvedHref" @click.prevent="onClickFakeNuxtAnchor"><slot/></a>
</template>

<script src="./AnchorOrNuxtLink.js"></script>
