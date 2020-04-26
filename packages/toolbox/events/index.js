/**
 * @module EventsManager
 * @package @fiad/toolbox
 * @description A simple and performing events management system
 */

import Stream from '@fiad/toolbox/stream'
import EventsBus from './bus'

class EventsManager {
  /**
   * The inner instance of event bus
   * @private
   * @type {EventBus}
   */
  #bus = new EventsBus()

  /**
   * The mapping object of events alias/type
   * @private
   * @type {object}
   */
  #aliases = {}

  /**
   * The listeners
   * @private
   * @type {object}
   */
  #listeners = {}

  /**
   * Checks if the given target supports native event listeners
   * @private
   * @static
   * @param {any} target The target to perform check on
   */
  static #supportsEventListeners(target) {
    return target === window
      || target instanceof HTMLDocument
      || target instanceof HTMLElement
  }

  /**
   * Subscription getter
   * @private
   * @static
   * @param {Array} args
   */
  static #getSubscriptionData(args) {
    let callback
    let config
    let target

    if (typeof args[0] === 'function') {
      callback = args[0]
      config = args[1] || {}
    } else if (EventsManager.#supportsEventListeners(args[0])) {
      target = args[0]
      callback = args[1]
      config = args[2] || {}
    }

    return { callback, config, target }
  }

  /**
   * Forwards subscription to the events bus
   * @private
   * @param {string} type The event type
   * @param {string} alias The event alias
   * @param {function} callback The callback to be subscribed
   * @param {(object|null)} config The dispatching config
   */
  #subscribeToBus(type, alias, callback, config) {
    if (!this.#aliases.hasOwnProperty(alias)) {
      this.#aliases[alias] = type
    } else if (this.#aliases[alias] !== type) {
      Stream.log({
        message: `
          Subscription skipped because of conflicts:
          maybe you're trying to set an event alias that's
          already in use for a different event type
        `,
        type: 'warn',
        namespace: '@fiad',
        context: 'events'
      })
      return
    }

    this.#bus.subscribe(alias, callback, config)
  }

  /**
   * Forwards un-subscription to the events bus
   * @private
   * @param {string} alias The event alias
   * @param {function} callback The callback to be unsubscribed
   */
  #unsubscribeFromBus(alias, callback) {
    this.#bus.unsubscribe(alias, callback)
  }

  /**
   * Adds an event listener for the given event
   * @private
   * @param {string} alias The event alias
   * @param {(Window|HTMLDocument|HTMLElement)} target The event target
   * @param {string} delegateTo The selector of elements to delegate the event to
   * @param {object} options The listeners options
   */
  #addListener(alias, target, delegateTo, options) {
    const type = this.#aliases[alias]
    const listenerKey = delegateTo ? `${type}:${alias}:${delegateTo}` : `${type}:${alias}`
    const listener = delegateTo
      ? e => (e.target.closest(delegateTo) && this.#bus.dispatch(alias, { payload: e }))
      : e => this.#bus.dispatch(alias, { payload: e })

    // registering listener
    this.#listeners[listenerKey] = listener
    target.addEventListener(type, this.#listeners[listenerKey], options)
  }

  /**
   * Destroys an event listener if the events bus has no subscriptions for the given event
   * @private
   * @param {string} alias The event alias
   * @param {(Window|HTMLDocument|HTMLElement)} target The event target
   * @param {string} delegateTo The selector of elements to delegate the event to
   * @param {object} options The listeners options
   */
  #removeListener(alias, target, delegateTo, options) {
    const type = this.#aliases[alias]
    const listenerKey = delegateTo ? `${type}:${alias}:${delegateTo}` : `${type}:${alias}`

    // destroying listener
    target.removeEventListener(type, this.#listeners[listenerKey], options)
    delete this.#listeners[listenerKey]
  }

  /**
   * Handles event subscription
   * @param {(string|string[])} type The event type to be listened to
   * @param {...any} args
   */
  on(type, ...args) {
    if (Array.isArray(type)) {
      type.forEach(t => this.on(t, ...args))
      return
    }

    const {
      callback,
      config: { alias = type, delegateTo, ...config },
      target
    } = EventsManager.#getSubscriptionData(args)

    const listenerKey = delegateTo ? `${type}:${alias}:${delegateTo}` : `${type}:${alias}`

    // handling subscription to the events bus
    this.#subscribeToBus(type, alias, callback, config)

    if (
      target // it's a native event, so we need a listener that triggers the related custom event from the events bus
      && !this.#listeners.hasOwnProperty(listenerKey) // a listener doesn't exist yet
    ) {
      this.#addListener(alias, target, delegateTo, config)
    }
  }

  /**
   * Handles event un-subscription
   * @param {(string|string[])} type The event type (alias)
   * @param {...any} args
   */
  off(type, ...args) {
    if (Array.isArray(type)) {
      type.forEach(a => this.off(a, ...args))
      return
    }

    const {
      callback,
      config: { alias = type, delegateTo, ...config },
      target
    } = EventsManager.#getSubscriptionData(args)

    // handling un-subscription from the events bus
    this.#unsubscribeFromBus(alias, callback, config)

    if (
      target // it's a native event, so a listener has been registered
      && !this.#bus.hasSubscriptions(alias) // the events bus has no more subscriptions for that event, so the listener is no longer required
    ) {
      this.#removeListener(alias, target, delegateTo)
    }
  }

  /**
   * Dispatches event (both native and custom)
   * @param {string} type The event type (native or alias)
   * @param {...any} args
   */
  dispatch(type, ...args) {
    if (!this.#aliases.hasOwnProperty(type)) {
      return
    }

    if (EventsManager.#supportsEventListeners(args[0])) {
      // dispatching the native event
      // N.B.: by dispatching the native event, the related custom event will be
      // automatically dispatched by the listener registered on subscription
      const nativeType = this.#aliases[type]
      const options = args[1] ? { detail: args[1] } : null
      const event = new Event(nativeType, options)
      args[0].dispatchEvent(event)
    } else {
      // directly dispatching the custom event
      this.#bus.dispatch(type, args[0])
    }
  }
}

/**
 * Exporting as singleton
 */
const instance = new EventsManager()

export default {
  on: (...args) => instance.on(...args),
  off: (...args) => instance.off(...args),
  dispatch: (...args) => instance.dispatch(...args)
}
