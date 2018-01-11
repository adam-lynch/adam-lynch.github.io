import Anchor from '~/components/Anchor/Anchor.vue'

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
    shouldTrackAnchorClicks: Boolean
  }
}
