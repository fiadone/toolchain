/**
 * Checks if the given value can be merged
 * @param {any} value
 * @returns {boolean}
 */
function canMerge(value) {
  const nonNullObject = value && typeof value === 'object'

  return nonNullObject
    && Object.prototype.toString.call(value) !== '[object RegExp]'
    && Object.prototype.toString.call(value) !== '[object Date]'
}

/**
 * Returns a corresponding empty entity according to the given value type
 * @param {any} value
 * @returns {(object|Array)}
 */
function emptyEntity(value) {
  return Array.isArray(value) ? [] : {}
}

/**
 * Returns a clone of the given value (if required)
 * @param {any} value
 * @param {object} config
 * @returns {(object|Array)}
 */
function maybeClone(value, config = {}) {
  const { clone } = config

  return (clone && canMerge(value))
    ? deepMerge(emptyEntity(value), value, config)
    : value
}

/**
 * Handles arrays merging
 * @param {Array} target
 * @param {Array} source
 * @param {object} config
 * @returns {Array}
 */
function mergeArrays(target, source, config) {
  const destination = [...target]

  source.forEach((entry, i) => {
    if (typeof destination[i] === 'undefined') {
      destination[i] = maybeClone(entry, config)
    } else if (canMerge(entry)) {
      destination[i] = deepMerge(target[i], entry, config)
    } else if (target.indexOf(entry) === -1) {
      destination.push(maybeClone(entry, config))
    }
  })

  return destination
}

/**
 * Handles objects merging
 * @param {object} target
 * @param {object} source
 * @param {object} config
 */
function mergeObjects(target, source, config) {
  const destination = {}

  if (canMerge(target)) {
    Object.keys(target).forEach(key => {
      destination[key] = maybeClone(target[key], config)
    })
  }

  Object.keys(source).forEach(key => {
    destination[key] = (!canMerge(source[key]) || !target[key])
      ? maybeClone(source[key], config)
      : deepMerge(target[key], source[key], config)
  })

  return destination
}

/**
 * Provides a deep merge between two objects or arrays
 * @param {(object|Array)} target
 * @param {(object|Array)} source
 * @param {object} config
 */
export default function deepMerge(target, source, config) {
  if (Array.isArray(source)) {
    return Array.isArray(target)
      ? mergeArrays(target, source, config)
      : maybeClone(source, config)
  }

  return mergeObjects(target, source, config)
}
