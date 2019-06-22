<template>
  <layout>
    <template v-slot:page-content>
      <Content class="theme-default-content"/>
    </template>
  </layout>
</template>

<script>
  import Layout from '@theme/layouts/Layout.vue'

  export default {
    components: {
      Layout,
    },
  }
</script>
