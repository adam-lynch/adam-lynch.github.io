import Anchor from '@theme/components/Anchor/Anchor.vue'
import Navigation from '@theme/components/Navigation/Navigation.vue'

export default {
  components: {
    Anchor,
    Navigation
  },
  computed: {
    githubAccountUrl() {
      return this.$themeConfig.githubAccountUrl;
    },
  },
}
