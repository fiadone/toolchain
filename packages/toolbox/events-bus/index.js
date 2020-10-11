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
   * @param {any} customPayload A custom payload
   */
  #handleSubscription([options = {}, callback], customPayload) {
    const { payloadFilter, defaultPayload } = options
    const rawPayload = (typeof customPayload !== 'undefined') ? customPayload : defaultPayload
    let payload = rawPayload

    if (typeof payloadFilter === 'function') {
      payload = payloadFilter(payload)
    }

    callback(payload, { ...options, rawPayload })
  }

  /**
   * Adds a callback to subscriptions
   * @param {string} type The event type
   * @param {function} callback The callback to be subscribed
   * @param {(object|null)} options The dispatching options
   */
  subscribe(type, callback, options) {
    if (typeof type !== 'string' || typeof callback !== 'function') {
      return
    }

    if (!this.#subscriptions.hasOwnProperty(type)) {
      this.#subscriptions[type] = new Map()
    } else if (this.#subscriptions[type].has(callback)) {
      return
    }

    this.#subscriptions[type].set(callback, options)
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
   * @param {any} payload The callback payload
   */
  dispatch(type, payload) {
    if (typeof type !== 'string' || !this.#subscriptions.hasOwnProperty(type)) {
      return
    }

    this.#subscriptions[type]
      .forEach((...subscription) => this.#handleSubscription(subscription, payload))
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
   * @param {string} type The event type's subscriptions stack to be cleared
   */
  clear(type) {
    if (typeof type === 'undefined') {
      // clearing all subscriptions
      Object
        .values(this.#subscriptions)
        .forEach(map => map.clear())
    } else if (this.hasSubscriptions(type)) {
      // clearing subscription related to the given event type only
      this.#subscriptions[type].clear()
    }
  }
}

export default EventsBus
