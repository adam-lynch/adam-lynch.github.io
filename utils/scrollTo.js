// Taken from a Gist / Stack Overflow

if (process.browser) {
  // easing functions http://goo.gl/5HLl8
  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2
    if (t < 1) {
      return c / 2 * t * t + b
    }
    t--
    return -c / 2 * (t * (t - 2) - 1) + b
  }

  Math.easeInCubic = function (t, b, c, d) {
    var tc = (t /= d) * t * t
    return b + c * (tc)
  }

  Math.inOutQuintic = function (t, b, c, d) {
    var ts = (t /= d) * t
    var tc = ts * t
    return b + c * (6 * tc * ts + -15 * ts * ts + 10 * tc)
  }
}

export default function scrollTo (to, callback, duration) {
  // because it's so fucking difficult to detect the scrolling element, just move them all
  function move (amount) {
    document.documentElement.scrollTop = amount
    document.body.parentNode.scrollTop = amount
    document.body.scrollTop = amount
  }
  function position () {
    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop
  }
  const start = position()
  const change = to - start
  let currentTime = 0
  const increment = 20
  duration = (typeof (duration) === 'undefined') ? 500 : duration
  var animateScroll = function () {
  // increment the time
    currentTime += increment
    // find the value with the quadratic in-out easing function
    var val = Math.easeInOutQuad(currentTime, start, change, duration)
    // move the document.body
    move(val)
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll)
    } else {
      if (callback && typeof (callback) === 'function') {
      // the animation is done so lets callback
        callback()
      }
    }
  }
  animateScroll()
}
