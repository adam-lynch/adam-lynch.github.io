import format from 'date-fns/format'
import Anchor from '~/components/Anchor/Anchor.vue'
import AnchorOrNuxtLink from '~/components/AnchorOrNuxtLink/AnchorOrNuxtLink.vue'
import trackExternalLinkClick from '~/utils/trackExternalLinkClick'

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
    href () {
      if (this.isPostTitleAnExternalLink) {
        return this.original.url
      }
      return this.$router.resolve(this.to).href
    },
    isPostTitleAnExternalLink () {
      return this.original && this.original.onlyExternal
    },
    prettyDate () {
      const thisYear = format(new Date(), 'YYYY')
      const articleDate = this.article.updated_at || this.article.published_at
      const postYear = format(articleDate, 'YYYY')
      const year = thisYear === postYear ? '' : `, ${postYear}`
      return format(articleDate, 'MMMM Do') + year
    },
    to () {
      return { name: '@nuxtjs/blog:article', params: Object.assign({ id: this.id }, this.$attrs) }
    }
  },

  data: () => ({
    skeletons
  }),

  methods: {
    onClickPostTitle (e) {
      if (!this.isPostTitleAnExternalLink) {
        e.preventDefault()
        this.$router.push(this.to)
      }
      trackExternalLinkClick(this.href)
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
