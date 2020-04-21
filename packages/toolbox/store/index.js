/**
 * @module Store
 * @package @fiad/toolbox
 * @description A simple state management handler
 */

import isEqual from 'lodash/isEqual'
import EventsBus from '@fiad/toolbox/events/bus'

class Store {
  /**
   * @constructor
   * @param {object} state The initial store's state
   */
  constructor(state = {}) {
    this.#originalState = state
    this.#state = state
    this.#bus = new EventsBus()
  }

  /**
   * State getter
   * @param {(string|null)} key The property key to be retrieved
   */
  get(key) {
    return key ? this.#state[key] : this.#state
  }

  /**
   * State setter
   * @param {...any} args
   */
  set(...args) {
    switch (typeof args[0]) {
      case 'string':
        if (!isEqual(this.get(args[0]), args[1])) {
          this.#state[args[0]] = args[1]
          this.#bus.dispatch(args[0], args[1])
        }
        break
      case 'function':
        this.set(args[0](this.#state))
        break
      default:
        Object
          .entries(args[0])
          .forEach(([key, value]) => this.set(key, value))
        break
    }
  }

  /**
   * Resets store to its original state
   */
  reset() {
    this.set(this.#originalState)
  }

  /**
   * Adds a listener that observes changes on the given property
   * @param {string} key The property to be observed
   * @param {function} callback The handler to be called when a property update occurs
   */
  observe(key, callback) {
    this.#bus.subscribe(key, callback)
  }

  /**
   * Removes the listener that observes changes on the given property
   * @param {string} key The property to be unobserved
   * @param {function} callback The handler that no longer needs to be called when a property update occurs
   */
  unobserve(key, callback) {
    this.#bus.unsubscribe(key, callback)
  }
}

export default Store