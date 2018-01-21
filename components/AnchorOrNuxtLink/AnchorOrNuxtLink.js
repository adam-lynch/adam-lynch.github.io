import Anchor from '~/components/Anchor/Anchor.vue'

export default {
  components: {
    Anchor
  },

  computed: {
    nuxtHref () {
      return this.$router.resolve(this.nuxtLinkTo).href
    }
  },

  methods: {
    navigate () {
      this.$router.push(this.nuxtLinkTo)
    }
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
