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
  static namespace = '@fiad'

  /**
   * Generates the log output
   * @private
   * @static
   * @param {string} message The message to be logged
   * @param {(string|null)} context The log context (module, package, component, etc)
   * @param {(string|null)} namespace The log namespace
   */
  static #buildMessage(message, context, namespace) {
    const sign = [namespace, context]
      .filter(p => !!p)
      .map(p => `[${p.trim()}]`)
      .join()
  
    return `${sign} ${message.trim()}`
  }

  /**
   * Logs a formatted message
   * @static
   * @param {object} config The log configuration object 
   */
  static log({ message, type = 'info', data, context, namespace = Stream.namespace } = {}) {
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
   * @param {object} config The log configuration object
   * @throws {string}
   */
  static throw({ message, context, namespace = Stream.namespace } = {}) {
    throw buildOutput(message, context, namespace)
  }
}
