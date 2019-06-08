/* global ga */
export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // ...apply enhancements to the app

  // TODO: track page changes for GA
  router.beforeEach((to, from, next) => {
    if (typeof window === 'object' && 'ga' in window) {
      ga('send', 'pageview', to.fullPath);
    }
    next();
  });
}
