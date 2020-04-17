const axios = require('axios')

/**
 * Decorates config with default headers
 * @param {object} config The axios config
 */
function withDefaultHeaders(config) {
  if (!config.headers) {
    config.headers = {
      'Content-Type': 'application/json',
      accept: 'application/json'
    }
  }

  return config
}

/**
 * Decorates config with authorization headers
 * @param {object} config The axios config
 * @param {string} jwt The authorization token
 */
function withAuthorization(config, jwt) {
  if (jwt) {
    config.headers.Authorization = `Bearer ${jwt}`
  }

  return config
}

/**
 * Decorates config with transformResponse in order to provide a result shorthand 
 * @param {object} config The axios config
 */
function withResponseSuccess(config) {
  config.transformResponse = data => {
    data.success = data.status >= 200 && data.status < 300
  }

  return config
}

/**
 * Async request handler
 * @param {object} config The axios config
 * @param {string} jwt The authorization token
 */
async function asyncRequest(config, jwt) {
  config = withResponseSuccess(withAuthorization(withDefaultHeaders(config), jwt))

  let response = {}

  try {
    response = await axios(config)
  } catch (error) {
    response = error.response
  }

  return response
}

module.exports = asyncRequest
