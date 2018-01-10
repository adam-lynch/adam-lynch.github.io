/* global ga */
export default function ({ route }) {
  if (typeof ga !== 'function') {
    return //eslint-disable-line
  }
  ga('send', 'pageview', route.fullPath)
}
