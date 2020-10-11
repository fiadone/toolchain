/**
 * Event delegation handler
 * @param {function} fn The handler to be delegated
 * @param {string} selector The selector of elements to delegate the event to
 */
export default function delegate(fn, selector) {
  if (typeof selector !== 'string') return fn

  return function(e) {
    if (!e.target.matches(selector) && !e.target.closest(selector)) return
    fn(e)
  }
}
