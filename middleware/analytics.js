/* global ga, goatcounter */
export default function ({ route }) {
  if (typeof goatcounter !== 'undefined') {
    try {
      goatcounter.count({
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
