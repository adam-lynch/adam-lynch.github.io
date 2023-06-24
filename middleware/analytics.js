/* global ga */
export default function ({ route }) {
  if (typeof global.goatcounter === 'function') {
    try {
      global.goatcounter.count({
        path: route.fullPath,
        title: document.title
      })
    } catch (e) {
      console.error(e)
    }
  }
  if (typeof ga === 'function') {
    try {
      ga('send', 'pageview', route.fullPath)
    } catch (e) {
      console.error(e)
    }
  }
}
