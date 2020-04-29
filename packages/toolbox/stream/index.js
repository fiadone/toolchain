/**
 * @module Stream
 * @package @fiad/toolbox
 * @description A consistent logger and error management system
 */
class Stream {
  /**
   * The default log namespace
   * @type {string}
   * @static
   */
  static namespace

  /**
   * Generates the log output
   * @private
   * @static
   * @param {string} message The message to be logged
   * @param {(string|null)} context The log context (module, package, component, etc)
   * @param {(string|null)} namespace The log namespace
   */
  static #buildMessage(message = '', context = '', namespace = '') {
    if (typeof message !== 'string' || !message) {
      return ''
    }

    const sign = [namespace, context]
      .filter(p => typeof p === 'string' && !!p.trim())
      .map(p => {`[${p.trim()}]`})
      .join('')

    return `${sign} ${message.trim()}`
  }

  /**
   * Logs a formatted message
   * @static
   * @param {string} message The log message
   * @param {object} config The log configuration object
   */
  static log(message, { type = 'info', context, namespace = Stream.namespace, data, style } = {}) {
    const output = `${style ? '%c ' : ''}${Stream.#buildMessage(message, context, namespace)}`
    const args = style ? [style, data] : [data]

    switch (type) {
      case 'log':
      case 'info':
      case 'warn':
      case 'error':
        console[type](output, ...args)
        break
      default:
        if (typeof console[type] === 'function') {
          console.log(output)
          console[type](...args)
        } else {
          console.log(output, ...args)
        }
        break
    }
  }

  /**
   * Throws an error
   * @static
   * @param {string} message The error message
   * @param {(string|number)} code The error code
   * @throws {string}
   */
  static throw(message, code) {
    const error = new Error(message)

    if (typeof code !== 'undefined') {
      error.code = code
    }

    throw error
  }

  /**
   * Creates a high order function that implements the try/catch block and handles error logging
   * @param {function} fn The catchable function
   * @param {object} config The log configuration object
   * @returns {function}
   */
  static catchable(fn, config) {
    return function() {
      let res

      try {
        res = fn.apply(this, arguments)
      } catch (err) {
        const message = (typeof err.code !== 'undefined')
          ? `${err.message} (${err.code})`
          : err.message

        Stream.log(message, { type: 'error', ...config })
      }

      return res
    }
  }
}

export default Stream
