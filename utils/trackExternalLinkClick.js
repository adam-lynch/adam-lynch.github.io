/* global ga */
export default function (href) {
  if (typeof ga !== 'function') {
    return
  }
  ga('send', 'event', 'outbound', 'click', href)
}
