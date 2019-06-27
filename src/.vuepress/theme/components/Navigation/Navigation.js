import NavigationItem from '@theme/components/NavigationItem/NavigationItem.vue'

export default {
  components: {
    NavigationItem
  },
  computed: {
    githubAccountUrl() {
      return this.$themeConfig.githubAccountUrl;
    },
    repositoryUrl() {
      return this.$themeConfig.docsRepo;
    },
  },
}



