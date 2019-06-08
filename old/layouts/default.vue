<template>
  <div class="wrapper">
    <main class="content">
      <my-header></my-header>
      <nuxt/>
      <my-footer></my-footer>
    </main>
  </div>
</template>


<script>
import Header from '~/components/Header/Header.vue'
import Footer from '~/components/Footer/Footer.vue'

export default {
  components: {
    'my-header': Header,
    'my-footer': Footer
  }
}
</script>
