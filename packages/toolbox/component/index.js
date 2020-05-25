/**
 * @module component
 * @package @fiad/toolbox
 * @description A simple component base class
 */

import { getElements, getDataset } from '../dom'

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
    const dataset = getDataset(this.root)

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
    return getElements('[data-ref]', { context: this.root }).reduce((acc, el) => {
      const { ref: key } = getDataset(el)

      if (acc[key]) {
        if (!Array.isArray()) {
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
