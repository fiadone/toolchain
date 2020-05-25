import equal from './equal'

/**
 * Checks if the given item is a plain object
 * @param {any} item The item to be checked
 */
function isPlainObject(item) {
  return item instanceof Object && item.constructor === Object
}

/**
 * Retrieves differences between two objects
 * @param {any} a
 * @param {any} b
 * @returns {boolean}
 */
export default function diff(a, b) {
  if (!isPlainObject(a) || !isPlainObject(b)) return [a, b]

  const _diff = {}

  Object
    .entries(a)
    .forEach(([key, value]) => {
      if (!equal(b[key], value)) {
        _diff[key] = diff(value, b[key])
      }
    })

  Object
    .entries(b)
    .forEach(([key, value]) => {
      if (!a.hasOwnProperty(key)) {
        _diff[key] = [undefined, value]
      }
    })

  return _diff
}
