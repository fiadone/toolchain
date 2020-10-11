/**
 * @module component
 * @package @fiad/toolbox
 * @description A simple component base class
 */

import { attach, detach } from './helpers'

class Component {
  /**
   * @constructor
   * @param {Element} el The element to mount the component on
   * @param {object} config The component configuration object
   */
  constructor(el, config = {}) {
    this.root = el
    this.config = config
    this.props = { ...config.defaultProps, ...this.#retrieveProps() }
    this.refs = this.#retrieveRefs()

    if (config.autoInit !== false) {
      this.init()
    }
  }

  /**
   * Retrieves component props from DOM
   */
  #retrieveProps() {
    const { dataset } = this.root

    return Object.entries(dataset).reduce((acc, [key, value]) => {
      if (!key.match(/^component/)) {
        try {
          acc[key] = JSON.parse(value)
        } catch(err) {
          acc[key] = value
        }
      }
      return acc
    }, {})
  }

  /**
   * Retrieves component refs from DOM
   */
  #retrieveRefs() {
    const refs = this.root.querySelectorAll('[data-ref]')

    return Array.from(refs).reduce((acc, el) => {
      const { ref: key } = el.dataset

      if (acc[key]) {
        if (!Array.isArray(acc[key])) {
          acc[key] = [acc[key]]
        }

        acc[key].push(el)
      } else {
        acc[key] = el
      }

      return acc
    }, {})
  }

  /**
   * Component initializer
   */
  init() {}

  /**
   * Component destructor
   */
  destroy() {}
}

export default Component
export { attach, detach }
