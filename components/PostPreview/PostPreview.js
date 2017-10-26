import format from 'date-fns/format'

export default {
  computed: {
    prettyDate () {
      const thisYear = format(new Date(), 'YYYY')
      const postYear = format(this.date, 'YYYY')
      const year = thisYear === postYear ? '' : `, ${postYear}`
      return format(this.date, 'MMMM Do') + year
    }
  },
  props: {
    blogLink: {
      required: true,
      type: String
    },
    blogName: {
      required: true,
      type: String
    },
    date: {
      required: true,
      type: String
    },
    isBook: Boolean,
    summary: {
      required: true,
      type: String
    },
    title: {
      required: true,
      type: String
    },
    url: {
      required: true,
      type: String
    }
  }
}
