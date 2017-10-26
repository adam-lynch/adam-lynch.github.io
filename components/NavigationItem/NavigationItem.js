export default {
  computed: {
    classes () {
      return this.shouldTrackClicks ? 'js_track-link-clicks' : ''
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
