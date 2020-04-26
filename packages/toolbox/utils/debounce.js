/**
 * Debouncing handler
 * @param {function} fn The function to be debounced
 * @param {number} ms The debounce time
 */
export default function debounce(fn, ms) {
  if (!ms || !parseInt(ms)) return fn

  let delay

  return function() {
    clearTimeout(delay)
    delay = setTimeout(() => fn.apply(this, arguments), ms)
  }
}
