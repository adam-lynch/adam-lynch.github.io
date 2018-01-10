import AnchorOrNuxtLink from '~/components/AnchorOrNuxtLink/AnchorOrNuxtLink.vue'

export default {
  components: {
    AnchorOrNuxtLink
  },
  computed: {
    isExternal () {
      return /^[a-z]+:/.test(this.url)
    }
  },
  props: {
    shouldTrackAnchorClicks: Boolean,
    specificClasses: String,
    text: {
      required: true,
      type: String
    },
    url: {
      required: true,
      type: String
    }
  }
}
