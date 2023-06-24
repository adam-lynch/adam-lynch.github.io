/* global goatcounter */
export default function ({ route }) {
  if (typeof goatcounter === 'undefined') {
    return
  }

  try {
    goatcounter.count({
      path: route.fullPath,
      title: document.title
    })
  } catch (e) {
    console.error(e)
  }
}
