import PostPreview from '~/components/PostPreview/PostPreview.vue'
const api = require('~/modules/blog/app/mixins/api').default.api

export default {
  async asyncData (context) {
    const { params, payload, app } = context

    if (typeof (payload) === 'object' && payload) {
      return { page: payload }
    }

    return { page: await api(process.env.__NUXT_BLOG__.templates.indexArticles, params, app) }
  },
  components: {
    PostPreview
  },

  computed: {
    articles () {
      return this.page || []
    }
  }
}
