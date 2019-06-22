import Anchor from '@theme/components/Anchor/Anchor.vue'

export default {
  components: {
    Anchor
  },

  props: {
    anchorUrl: String,
    nuxtLinkTo: {
      type: [Object, String],
      required: true
    },
    isAnchor: Boolean,
    shouldShowOutboundIcon: {
      type: Boolean,
      default: true, // TODO: false for GitHub, etc.?
    },
    shouldTrackAnchorClicks: Boolean,
  }
}
