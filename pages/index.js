import { mapState } from 'vuex'
import PostPreview from '~/components/PostPreview/PostPreview.vue'

export default {
  components: {
    PostPreview
  },

  computed: {
    ...mapState(['posts'])
  }
}
