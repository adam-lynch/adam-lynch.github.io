import scrollTo from '~/utils/scrollTo'
import isBefore from 'date-fns/is_before'
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

  // Route transition to individual blog post
  transition (to, from) {
    if (!(from && to && to.name === '@nuxtjs/blog:article' && requestAnimationFrame)) {
      return
    }

    const postAnchor = document.querySelector(`.posts a.post-title[href="${to.fullPath}"]`)
    if (!(postAnchor && Object.getPrototypeOf(postAnchor).closest)) {
      return
    }

    // animate
    const bodyTop = document.body.getBoundingClientRect().top
    const postWrapper = postAnchor.closest('.post-wrapper')
    postWrapper.classList.add('post-wrapper--entering-from-posts')
    const posts = postWrapper.closest('.posts')

    const postsTop = Math.abs(bodyTop - posts.getBoundingClientRect().top)
    const postsPaddingTop = parseInt(window.getComputedStyle(posts, null).getPropertyValue('padding-top'), 10)
    const postWrapperTop = Math.abs(bodyTop - postWrapper.getBoundingClientRect().top)
    const postWrapperRelativeTop = postWrapperTop - postsTop - postsPaddingTop

    const newPostWrapper = document.createElement('li')
    newPostWrapper.innerHTML = postWrapper.innerHTML
    newPostWrapper.classList.add('post-wrapper', 'post-wrapper--entering-from-posts')
    newPostWrapper.style.top = `${Math.max(postWrapperRelativeTop, postsPaddingTop)}px`
    newPostWrapper.style.position = 'absolute'
    newPostWrapper.style.zIndex = 10000

    posts.classList.add('posts--entering-post')
    posts.appendChild(newPostWrapper)

    // animate to the top if it's not already there
    requestAnimationFrame(() => {
      if (postWrapperRelativeTop) {
        newPostWrapper.style.transform = `translate3d(0, -${postWrapperTop - postsTop - postsPaddingTop * 2}px, 0)`
      }
      scrollTo(0, () => {}, 300)
    })

    return {
      duration: 400
    }
  }
}
