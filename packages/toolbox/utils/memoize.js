/**
 * Handles function results caching
 * @param {function} fn The function to memoize
 * @returns {function}
 * @throws
 */
export default function memoize(fn) {
  if (typeof fn !== 'function') {
    throw 'Memoization not allowed: the argument must be a function'
  }

  const cache = {}

  return function(...args) {
    const key = JSON.stringify(args)

    if (!cache.hasOwnProperty(key)) {
      console.log('calculating result')
      cache[key] = fn.apply(this, args)
    } else {
      console.log('getting result from cache')
    }

    return cache[key]
  }
}
