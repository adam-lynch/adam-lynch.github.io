import format from 'date-fns/format'
import Anchor from '~/components/Anchor/Anchor.vue'
import AnchorOrNuxtLink from '~/components/AnchorOrNuxtLink/AnchorOrNuxtLink.vue'

const skeletons = []
for (let i = 0; i < 3; i++) {
  const words = []

  for (let j = 0; j < 65; j++) {
    words.push(null)
  }

  skeletons.push({ words })
}

export default {
  components: {
    Anchor,
    AnchorOrNuxtLink
  },

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

  data: () => ({
    skeletons
  }),

  methods: {
    onClickPostTitle () {
      console.log('onClickPostTitle 2')
      this.$router.push(this.to)
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
    summary: {
      required: true,
      type: String
    },
    original: Object,
    renderedSummary: {
      required: true,
      type: String
    },
    published_at: {
      required: true,
      type: String
    }
  }
}
