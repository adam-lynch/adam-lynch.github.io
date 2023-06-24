/* global ga, goatcounter */
export default function ({ route }) {
  if (typeof goatcounter === 'function') {
    try {
      goatcounter.count({
        event: true,
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
