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
  }

  /**
   * Retrieves component props from DOM
   */
  #retrieveProps() {
    const { dataset } = this.root

    return Object.entries(dataset || {}).reduce((acc, [key, value]) => {
      if (!key.match(/^(component|ref)/)) {
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
    const refs = Array.from(this.root.querySelectorAll('[data-ref]')).filter(ref => {
      const isSubcomponentRoot = ref.matches('[data-component]')
      const parentComponent = isSubcomponentRoot ? null : ref.closest('[data-component]')
      return !parentComponent || parentComponent === this.root
    })

    return refs.reduce((acc, el) => {
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
}

export default Component
export { attach, detach }
