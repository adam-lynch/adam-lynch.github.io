import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['repositoryUrl'])
  }
}
