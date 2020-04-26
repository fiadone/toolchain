/**
 * @module cache
 * @package @fiad/toolbox
 * @description A collection of caching utility functions
 */

/**
 * Handles function results caching
 * @param {function} fn The function to memoize
 * @returns {function}
 */
export function memoize(fn) {
  if (typeof fn !== 'function') throw 'Memoization not allowed: the argument must be a function'

  const cache = {}

  return (...args) => {
    const key = JSON.stringify(args)

    if (!cache.hasOwnProperty(key)) {
      cache[key] = fn.apply(this, args)
    }

    return cache[key]
  }
}
