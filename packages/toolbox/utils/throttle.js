/**
 * Throttling handler
 * @param {function} fn The function to be throttled
 * @param {number} ms The throttle time
 */
export default function throttle(fn, ms) {
  if (!ms || !parseInt(ms)) return fn

  let skip

  return function() {
    if (!skip) {
      fn.apply(this, arguments)
      skip = true
      setTimeout(() => (skip = false), ms)
    }
  }
}
