import { mapState } from 'vuex'
import Navigation from '~/components/Navigation/Navigation.vue'

export default {
  components: {
    Navigation
  },
  computed: {
    ...mapState(['githubAccountUrl', 'siteUrl'])
  }
}
