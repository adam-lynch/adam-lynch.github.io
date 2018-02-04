
import format from 'date-fns/format'
import Article from '~/modules/blog/app/mixins/article'
import Clipboard from 'clipboard'
import DisqusComments from 'vue-disqus/VueDisqus.vue'
import Anchor from '~/components/Anchor/Anchor.vue'

export default {
  components: {
    Anchor,
    DisqusComments
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
      const thisYear = format(new Date(), 'YYYY')
      const postYear = format(this.article.published_at, 'YYYY')
      const year = thisYear === postYear ? '' : `, ${postYear}`
      return format(this.article.published_at, 'MMMM Do') + year
    },

    to () {
      return { name: '@nuxtjs/blog:article', params: Object.assign({ id: this.$route.params.id }, this.$attrs) }
    }
  },

  data: function () {
    return {
      isDiqsusReady: false,
      isMounted: false,
      numberOfWordsInCommentsSkeleton: 85,
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
    },

    onDisqusReady () {
      this.isDiqsusReady = true
    }
  },

  mounted () {
    this.isMounted = true
  },

  name: 'Article'
}
