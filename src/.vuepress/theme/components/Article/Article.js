
import format from 'date-fns/format'
// import Article from '~/modules/blog/app/mixins/article' // TODO
// import Clipboard from 'clipboard' // TODO
import Anchor from '@theme/components/Anchor/Anchor.vue'
import PostPreview from '@theme/components/PostPreview/PostPreview.vue'

export default {
  components: {
    Anchor,
    PostPreview
  },

  computed: {
    // TODO
    // contents () {
    //   return this.article.rendered
    //     .replace(/<h2[^>]*>.+?<\/h2>/i, '')
    // },

    moreArticles () {
      return []; // TODO
    },

    original () {
      return this.$page.frontmatter.original;
    },

    prettyDate () {
      const thisYear = format(new Date(), 'YYYY')
      const postYear = format(this.publishedAt, 'YYYY')
      const year = thisYear === postYear ? '' : `, ${postYear}`
      return format(this.publishedAt, 'MMMM Do') + year
    },

    publishedAt () {
      return this.$page.frontmatter.date;
    },

    title () {
      return this.$page.title;
    },

    to () {
      return this.$page.path;
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
    // TODO
    // if (!process.browser) {
    //   return
    // }

    // // Redirect if someone has manually entered the URL when they shouldn't have
    // if (this.article.original && this.article.original.onlyExternal) {
    //   window.location = this.article.original.url
    // }

    // copy to clipboard when post header anchors are clicked
    // this.clipboard = new Clipboard(`.${this.postHeaderAnchorClass}`, {
    //   text: (trigger) => trigger.href
    // })
    // this.clipboard.on('success', ({ trigger }) => {
    //   this.onCopyPostHeaderLink(trigger)
    // })
  },

  // extends: Article,

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
