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
  static log(message, { type = 'info', data, context, namespace = Stream.namespace } = {}) {
    const output = Stream.#buildMessage(message, context, namespace)

    switch (type) {
      case 'log':
      case 'info':
      case 'warn':
      case 'error':
        console[type](output, data)
        break
      default:
        if (typeof console[type] === 'function') {
          console.log(output)
          console[type](data)
        } else {
          console.log(output, data)
        }
        break
    }
  }

  /**
   * Throws a formatted error message
   * @static
   * @param {string} message The error message
   * @param {object} config The log configuration object
   * @throws {string}
   */
  static throw(message, { context, namespace = Stream.namespace } = {}) {
    throw Stream.#buildMessage(message, context, namespace)
  }
}

export default Stream
