<template>
<div class="container mt-3">
  <div class="row">
    <div class="col-xs-12 col-lg-8 offset-lg-2">
      <header>
        <small class="collection-links">
          <small class="text-uppercase">
            <nuxt-link :to="{ name: '@nuxtjs/blog:index' }">Back to blog</nuxt-link>
          </small>
        </small>
        <h1 class="collection-header">{{ collection.name }}</h1>
      </header>

      <ArticlePreview v-for="article in articles"
                      :key="article.id"
                      :id="article.id"
                      :title="article.title"
                      :summary="article.summary"
                      :published_at="article.published_at"
                      :updated_at="article.updated_at"
                      v-bind="article"
      />
    </div>
  </div>
</div>
</template>

<script>
import CollectionPage from '../mixins/collection'
import ArticlePreview from '~/components/PostPreview/PostPreview.vue'

export default {
  extends: CollectionPage,
  components: { ArticlePreview }
}
</script>


<style lang="scss">
.collection-links {
  margin-bottom: -1rem;
  display: block;
  text-align: right;
}

.blog-collection-index-meta {
  opacity: .75;
  font-size: .75rem;
}
</style>
