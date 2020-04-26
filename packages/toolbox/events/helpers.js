/**
 * Debounce helper
 * @param {function} fn The function to be debounced
 * @param {number} ms The debounce time
 */
export function debounce(fn, ms) {
  if (!ms || !parseInt(ms)) return fn

  let delay

  return function() {
    clearTimeout(delay)
    delay = setTimeout(() => fn.apply(this, arguments), ms)
  }
}

/**
 * Throttling helper
 * @param {function} fn The function to be throttled
 * @param {number} ms The throttle time
 */
export function throttle(fn, ms) {
  let skip

  return function() {
    if (!skip) {
      fn.apply(this, arguments)
      skip = true
      setTimeout(() => (skip = false), ms)
    }
  }
}
