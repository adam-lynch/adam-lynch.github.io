<template>
  <layout>
    <template v-slot:page-content>
      <div class="theme-default-content">
        <ul id="default-layout">
          <li v-for="page in $pagination.pages">
            <router-link class="page-link" :to="page.path">{{ page.title }}</router-link>
          </li>
        </ul>
        <div id="pagination">
          <router-link v-if="$pagination.hasPrev" :to="$pagination.prevLink">Prev</router-link>
          <router-link v-if="$pagination.hasNext" :to="$pagination.nextLink">Next</router-link>
        </div>
      </div>
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
