import Anchor from '~/components/Anchor/Anchor.vue'
import { mapState } from 'vuex'
import Navigation from '~/components/Navigation/Navigation.vue'

export default {
  components: {
    Anchor,
    Navigation
  },
  computed: {
    ...mapState(['githubAccountUrl', 'siteUrl'])
  }
}
