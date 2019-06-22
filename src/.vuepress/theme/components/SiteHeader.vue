<template>
  <nav
    class="nav-links"
    v-if="items.length"
  >
    <div
      class="nav-item"
      v-for="item in items"
      :key="item.link"
    >
      <NavLink
        :item="item"
      />
    </div>
  </nav>
</template>

<script>
import { resolveNavLinkItem } from '../util'
import NavLink from '@theme/components/NavLink.vue'

export default {
  components: {
    NavLink,
  },

  computed: {

    items () {
      return (this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        })
      })
    },
  }
}
</script>

<style lang="stylus">
</style>
