/**
 * Checks if the given arguments are equal
 * @param {any} a
 * @param {any} b
 * @returns {boolean}
 */
export default function equal(a, b) {
  if (typeof a !== typeof b) return false

  if (a instanceof Element && b instanceof Element) return a === b

  try {
    return JSON.stringify(a) === JSON.stringify(b)
  } catch (err) {
    return false
  }
}
