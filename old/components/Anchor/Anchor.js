import trackExternalLinkClick from '~/utils/trackExternalLinkClick'

export default {
  methods: {
    onClick ({target}) {
      if (this.shouldTrackClicks) {
        trackExternalLinkClick(target.href)
      }
    }
  },

  props: {
    shouldTrackClicks: Boolean
  }
}
