<template>
  <layout>
    <template v-slot:page-content>
      <Article>
        <Content/>
      </Article>
    </template>
  </layout>
</template>

<script>
  import Article from '@theme/components/Article/Article.vue'
  import Layout from '@theme/layouts/Layout.vue'

  export default {
    components: {
      Article,
      Layout,
    },
  }
</script>
