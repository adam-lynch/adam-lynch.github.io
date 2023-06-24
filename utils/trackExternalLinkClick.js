/* global goatcounter */
export default function (href) {
  if (typeof goatcounter !== 'undefined') {
    goatcounter.count({
      event: true,
      path: href,
      title: 'outbound'
    })
  }
}
