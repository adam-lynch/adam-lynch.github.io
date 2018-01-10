import Anchor from '~/components/Anchor/Anchor.vue'
import format from 'date-fns/format'
import { mapState } from 'vuex'

export default {
  components: {
    Anchor
  },

  data: () => ({
    year: format(new Date(), 'YYYY')
  }),
  computed: {
    ...mapState(['repositoryUrl'])
  }
}
