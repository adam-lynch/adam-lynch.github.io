import format from 'date-fns/format'

export default {
  computed: {
    prettyDate () {
      const thisYear = format(new Date(), 'YYYY')
      const postYear = format(this.published_at, 'YYYY')
      const year = thisYear === postYear ? '' : `, ${postYear}`
      return format(this.published_at, 'MMMM Do') + year
    },

    to () {
      return { name: '@nuxtjs/blog:article', params: Object.assign({ id: this.id }, this.$attrs) }
    }
  },

  name: 'Article',

  props: {
    id: {
      required: true,
      type: String
    },
    isBook: Boolean,
    title: {
      required: true,
      type: String
    },
    description: {
      required: true,
      type: String
    },
    original: Object,
    published_at: {
      required: true,
      type: String
    }
  }
}
