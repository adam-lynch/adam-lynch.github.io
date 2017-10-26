import { mapState } from 'vuex'
import NavigationItem from '~/components/NavigationItem/NavigationItem.vue'

export default {
  components: {
    NavigationItem
  },
  computed: {
    ...mapState(['githubAccountUrl', 'repositoryUrl'])
  }
}
