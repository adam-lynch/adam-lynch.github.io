export default {
  computed: {
    classes () {
      return this.shouldTrackClicks ? 'js_track-link-clicks' : ''
    },
    isExternal () {
      return /^[a-z]+:/.test(this.url)
    }
  },
  props: {
    shouldTrackClicks: Boolean,
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
