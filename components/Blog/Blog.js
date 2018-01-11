import isBefore from 'date-fns/is_before'
import PostPreview from '~/components/PostPreview/PostPreview.vue'

export default {
  components: {
    PostPreview
  },

  computed: {
    articles () {
      if (!this.page) {
        return []
      }

      return this.page.sort(({published_at: dateA}, {published_at: dateB}) => {
        if (dateA === dateB) {
          return 0
        }

        if (isBefore(dateA, dateB)) {
          return 1
        }

        return -1
      })
    }
  },

  created () {
    console.log('nuxt b articles', this.articles)
  },

  props: {
    page: {
      type: Array,
      required: true
    }
  }
}
