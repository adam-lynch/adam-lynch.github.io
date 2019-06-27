
<template>
    <li class="navigation-item" :class="specificClasses">
      <anchor-or-nuxt-link
        :anchorUrl="url"
        class="navigation-link"
        :isAnchor="isExternal"
        :nuxtLinkTo="url"
        :shouldShowOutboundIcon="false"
        :shouldTrackAnchorClicks="shouldTrackAnchorClicks">
          <span class="navigation-item-text">{{ text }}</span>
        </anchor-or-nuxt-link>
    </li>
</template>

<script src="./NavigationItem.js"></script>
