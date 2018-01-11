
<template>
  <anchor :href="anchorUrl" rel="noopener" :shouldTrackClicks="shouldTrackAnchorClicks" v-if="isAnchor"><slot/></anchor>
  <a :href="resolvedHref" @click.prevent="onClickFakeNuxtAnchor" v-else><slot/></a>
</template>

<script src="./AnchorOrNuxtLink.js"></script>
