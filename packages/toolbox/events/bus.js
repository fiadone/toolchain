/**
 * @module EventsBus
 * @package @fiad/toolbox/events
 * @description A custom events bus 
 */

class EventsBus {
  /**
   * The subscribed callbacks collection (grouped by event type)
   * @type {object}
   * @private
   */
  #subscriptions = {}

  /**
   * Arranges and executes a subscription callback
   * @param {Array} subscription The subscription data to be handled
   * @param {(object|null)} customConfig The custom dispatching ustomC
   */
  #handleSubscription([defaultConfig, callback], customConfig) {
    const {
      payloadFilter,
      payload: originalPayload,
      ...config
    } = { ...defaultConfig, ...customConfig }

    const payload = typeof payloadFilter === 'function'
      ? payloadFilter(originalPayload)
      : originalPayload

    callback(payload, config)
  }

  /**
   * Adds a callback to subscriptions
   * @param {string} type The event type
   * @param {function} callback The callback to be subscribed
   * @param {(object|null)} config The dispatching config
   */
  subscribe(type, callback, config) {
    if (typeof type !== 'string' || typeof callback !== 'function') {
      return
    }
      
    if (!this.#subscriptions.hasOwnProperty(type)) {
      this.#subscriptions[type] = new Map()
    } else if (this.#subscriptions[type].has(callback)) {
      return
    }

    this.#subscriptions[type].set(callback, config)
  }

  /**
   * Removes a callback from subscriptions
   * @param {string} type The event type
   * @param {function} callback The callback to be unsubscribed
   */
  unsubscribe(type, callback) {
    if (typeof type !== 'string' || !this.#subscriptions.hasOwnProperty(type)) {
      return
    }

    this.#subscriptions[type].delete(callback)
  }

  /**
   * Executes all subscribed callbacks for given event type
   * @param {string} type The event type
   * @param {object} config The callback config
   */
  dispatch(type, config = {}) {
    if (typeof type !== 'string' || !this.#subscriptions.hasOwnProperty(type)) {
      return
    }

    this.#subscriptions[type]
      .forEach((...subscription) => this.#handleSubscription(subscription, config))
  }

  /**
   * Checks if at least one subscription exists for given event type
   * @param {string} type The event type
   * @returns {boolean}
   */
  hasSubscriptions(type) {
    return this.#subscriptions.hasOwnProperty(type)
      && this.#subscriptions[type].size > 0
  }

  /**
   * Clears subscriptions
   */
  clear() {
    Object
      .values(this.#subscriptions)
      .forEach(map => map.clear())
  }

  /**
   * Destroys dispatcher subscriptions
   */
  destroy() {
    this.clear()

    Object
      .keys(this.#subscriptions)
      .forEach(key => (delete this.#subscriptions[key]))
  }
}

export default EventsBus
