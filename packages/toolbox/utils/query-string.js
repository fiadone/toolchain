/**
 * Builds a query string from the given object
 * @param {object} queryParams
 * @param {object} options
 * @returns {string}
 */
function fromObject(queryParams = {}, { encode = true, prefix = '?' } = {}) {
  return prefix + Object.entries(queryParams)
    .map(([key, value]) => `${key}=${encode ? encodeURIComponent(value) : value}`)
    .join('&')
}

/**
 * Transforms a query string to an object
 * @param {string} queryString
 * @returns {object}
 */
function toObject(queryString = window.location.search) {
  return queryString.replace(/^\?/, '')
    .split('&')
    .reduce((acc, entry) => {
      const [key, value] = entry.split('=')
      acc[key] = decodeURIComponent(value)
      return acc
    }, {})
}

export default { fromObject, toObject }
