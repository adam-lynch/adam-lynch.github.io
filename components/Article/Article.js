
import format from 'date-fns/format'
import Article from '~/modules/blog/app/mixins/article'
import Clipboard from 'clipboard'
import Anchor from '~/components/Anchor/Anchor.vue'
import PostPreview from '~/components/PostPreview/PostPreview.vue'

const getPrettyDate = function (input) {
  const thisYear = format(new Date(), 'YYYY')
  const postYear = format(input, 'YYYY')
  const year = thisYear === postYear ? '' : `, ${postYear}`
  return format(input, 'MMMM Do') + year
}

export default {
  components: {
    Anchor,
    PostPreview
  },

  computed: {
    classes () {
      return {'post-skeleton--visible': !this.isDiqsusReady}
    },

    contents () {
      return this.article.rendered
        .replace(/<h2[^>]*>.+?<\/h2>/i, '')
    },

    prettyDate () {
      return getPrettyDate(this.article.published_at)
    },

    prettyUpdatedAt () {
      if (!this.article.updated_at) {
        return ''
      }
      return getPrettyDate(this.article.updated_at)
    },

    to () {
      return { name: '@nuxtjs/blog:article', params: Object.assign({ id: this.$route.params.id }, this.$attrs) }
    }
  },

  data: function () {
    return {
      postHeaderAnchorClass: 'post-header-anchor'
    }
  },

  beforeDestroy () {
    // TODO: destroy clipboard
  },

  created () {
    if (!process.browser) {
      return
    }

    // Redirect if someone has manually entered the URL when they shouldn't have
    if (this.article.original && this.article.original.onlyExternal) {
      window.location = this.article.original.url
    }

    // copy to clipboard when post header anchors are clicked
    this.clipboard = new Clipboard(`.${this.postHeaderAnchorClass}`, {
      text: (trigger) => trigger.href
    })
    this.clipboard.on('success', ({ trigger }) => {
      this.onCopyPostHeaderLink(trigger)
    })
  },

  extends: Article,

  methods: {
    onCopyPostHeaderLink (postHeaderAnchor) {
      /*
       * Show a message to the user that the link was copied
       */
      const copiedClass = `${this.postHeaderAnchorClass}--copied`
      postHeaderAnchor.classList.add(copiedClass)
      setTimeout(() => {
        postHeaderAnchor.classList.remove(copiedClass)
      }, 3000)
    }
  },

  name: 'Article'
}
