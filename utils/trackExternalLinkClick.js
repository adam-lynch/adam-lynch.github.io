/* global ga, goatcounter */
export default function (href) {
  if (typeof goatcounter !== 'undefined') {
    goatcounter.count({
      event: true,
      path: href,
      title: 'outbound'
    })
  }
  if (typeof ga === 'function') {
    ga('send', 'event', 'outbound', 'click', href)
  }
}
