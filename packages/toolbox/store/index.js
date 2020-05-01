/**
 * @module Store
 * @package @fiad/toolbox
 * @description A simple state management handler
 */

import EventsBus from '@fiad/toolbox/events/bus'
import equal from '@fiad/toolbox/utils/equal'

class Store {
  /**
   * The original store's state
   * @private
   * @type {object}
   */
  #originalState = {}

  /**
   * The store's state
   * @private
   * @type {object}
   */
  #state = {}

  /**
   * The inner instance of event bus
   * @private
   * @type {EventBus}
   */
  #bus = new EventsBus()

  /**
   * @constructor
   * @param {object} state The initial store's state
   */
  constructor(state = {}) {
    this.#originalState = state
    this.#state = state
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
        if (!equal(this.get(args[0]), args[1])) {
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
   * @param {(string|string[])} key The property (or properties) to be observed
   * @param {function} callback The handler to be called when a property update occurs
   */
  observe(key, callback) {
    if (Array.isArray(key)) {
      key.forEach(k => this.#bus.subscribe(k, callback))
    } else {
      this.#bus.subscribe(key, callback)
    }
  }

  /**
   * Removes the listener that observes changes on the given property
   * @param {(string|string[])} key The property (or properties) to be unobserved
   * @param {function} callback The handler that no longer needs to be called when a property update occurs
   */
  unobserve(key, callback) {
    if (Array.isArray(key)) {
      key.forEach(k => this.#bus.unsubscribe(k, callback))
    } else {
      this.#bus.unsubscribe(key, callback)
    }
  }
}

export default Store
