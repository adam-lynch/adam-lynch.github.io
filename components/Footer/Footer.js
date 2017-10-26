import format from 'date-fns/format'
import { mapState } from 'vuex'

export default {
  data: () => ({
    year: format(new Date(), 'YYYY')
  }),
  computed: {
    ...mapState(['repositoryUrl'])
  }
}
