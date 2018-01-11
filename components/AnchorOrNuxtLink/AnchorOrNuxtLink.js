import Anchor from '~/components/Anchor/Anchor.vue'

export default {
  components: {
    Anchor
  },

  computed: {
    resolvedHref () {
      return this.$router.resolve(this.nuxtLinkTo).href
    }
  },

  methods: {
    onClickFakeNuxtAnchor () {
      debugger;//eslint-disable-line
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
