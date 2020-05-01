/**
 * @module Cursor
 * @package @fiad/toolbox
 * @description A performing custom cursors handler
 */

import gsap from 'gsap'
import Store from '@fiad/toolbox/store'
import EventManager from '@fiad/toolbox/events'
import debounce from '@fiad/toolbox/utils/debounce'
import { touch } from '@fiad/toolbox/detect'
import { lerp } from '@fiad/toolbox/math'
import { matches } from '@fiad/toolbox/dom'

class Cursor {
  /**
   * Global cursor's state manager
   * @private
   * @static
   * @type {Store}
   */
  static #store = new Store({
    coords: { x: 0, y: 0 },
    visible: false,
    holding: false,
    target: null
  })

  /**
   * Global cursor's enabling state
   * @private
   * @static
   * @type {boolean}
   */
  static #initialized = false

  /**
   * Retrieves pointer coordinates from the given event and normalizes them to make mouse and touch homogeneous
   * @param {Event} e The mouse/touch event
   * @returns {object} The normalized pointer coordinates
   */
  static #normalizeEventCoords(e) {
    const { clientX: x, clientY: y } = (e.type.indexOf('touch') >= 0)
      ? (e.touches[0] || e.changedTouches[0])
      : e

    return { x, y }
  }

  /**
   * Global mouse/touch move handler
   * @private
   * @static
   * @param {Event} e The mouse/touch event
   */
  static #onMove(e) {
    Cursor.#store.set({
      coords: Cursor.#normalizeEventCoords(e),
      visible: true
    })
  }

  /**
   * Global mouse enter handler
   * @private
   * @static
   */
  static #onEnter() {
    Cursor.#store.set('visible', true)
  }

  /**
   * Global mouse/touch leave handler
   * @private
   * @static
   */
  static #onLeave() {
    Cursor.#store.set({
      visible: false,
      target: null
    })
  }

  /**
   * Global mouse over handler
   * @private
   * @static
   * @param {Event} e The mouse event
   */
  static #onOver(e) {
    Cursor.#store.set('target', e.target)
  }

  /**
   * Global mouse/touch down handler
   * @private
   * @static
   */
  static #onDown() {
    Cursor.#store.set('holding', true)
  }

  /**
   * Global mouse/touch up handler
   * @private
   * @static
   */
  static #onUp() {
    Cursor.#store.set('holding', false)
  }

  /**
   * Global cursor state getter
   * @static
   * @param {any[]} args
   * @returns {object} The current cursor state
   */
  static get(...args) {
    return Cursor.#store.get(...args)
  }

  /**
   * Initializes the global cursor instance
   * @static
   */
  static init() {
    if (!Cursor.#initialized) {
      EventManager.on(['mousemove', 'touchmove'], window, Cursor.#onMove)
      EventManager.on('mouseenter', document, Cursor.#onEnter)
      EventManager.on(['mouseleave', 'touchleave'], document, Cursor.#onLeave)
      EventManager.on(['mousedown', 'touchstart'], document.body, Cursor.#onDown)
      EventManager.on(['mouseup', 'touchend'], document.body, Cursor.#onUp)
      EventManager.on('mouseover', document.body, Cursor.#onOver)
    }
  }

  /**
   * Destroys the global cursor instance
   * @static
   */
  static destroy() {
    if (Cursor.#initialized) {
      EventManager.off(['mousemove', 'touchmove'], window, Cursor.#onMove)
      EventManager.off('mouseenter', document, Cursor.#onEnter)
      EventManager.off(['mouseleave', 'touchleave'], document, Cursor.#onLeave)
      EventManager.off(['mousedown', 'touchstart'], document.body, Cursor.#onDown)
      EventManager.off(['mouseup', 'touchend'], document.body, Cursor.#onUp)
      EventManager.off('mouseover', document.body, Cursor.#onOver)
    }
  }

  /**
   * The list of the cursor's default triggers
   * @type {Array}
   */
  static defaultTriggers = ['a', 'button', '[data-cursor]']

  /**
   * @constructor
   * @param {Element} el The custom cursor element
   * @param {object} options The cursor options
   */
  constructor(el, options) {
    Cursor.init()

    this.el = el
    this.coords = null
    this.config = {
      origin: [0.5, 0.5],
      inertia: 0.2,
      ...options
    }

    this.#setup()

    EventManager.on('resize', window, this.#onResize)

    Cursor.#store.observe('visible', this.#toggleVisibility)
    Cursor.#store.observe('holding', this.#toggleHolding)
    Cursor.#store.observe('target', this.#checkTarget)

    if ((!touch || options.touch)) {
      gsap.ticker.add(this.#requestMoveFrame)
    }
  }

  /**
   * Basic cursor styles setter
   * @private
   */
  #setup = () => {
    const { origin, z = 9999 } = this.config

    gsap.set(this.el, {
      position: 'fixed',
      top: this.el.clientHeight * -origin[0],
      left: this.el.clientWidth * -origin[1],
      zIndex: z,
      pointerEvents: 'none'
    })
  }

  /**
   * Resize event handler
   * @private
   */
  #onResize = debounce(this.#setup, 300)

  /**
   * Updates the cursor element visibility state
   * @param {boolean} visible The current global cursor visibility state
   */
  #toggleVisibility = visible => {
    if (visible) {
      this.show()
    } else {
      this.hide()
    }
  }

  /**
   * Updates the cursor element holding state
   * @param {boolean} holding The current global cursor holding state
   */
  #toggleHolding = holding => {
    if (holding) {
      this.hold()
    } else {
      this.release()
    }
  }

  /**
   * Handles the update of the cursor element position
   */
  #requestMoveFrame = () => {
    const coords = Cursor.#store.get('coords')
    const { inertia } = this.config
    const withInertia = this.coords && typeof inertia === 'number' && inertia > 0 && inertia < 1

    this.move(coords, withInertia ? inertia : false)
  }

  /**
   * Handles the update of the cursor hover state according to the event target match test
   * @param {(Element|HTMLDocument|null)} target The mouse/touch event target
   */
  #checkTarget = target => {
    const { triggers = Cursor.defaultTriggers } = this.config
    const trigger = matches(target, triggers)

    this.hover(trigger)
  }

  /**
   * Adds the data-cursor-visible attribute to the cursor element
   */
  show = () => {
    this.el.setAttribute('data-cursor-visible', '')

    if (typeof this.config.onShow === 'function') {
      this.config.onShow()
    }
  }

  /**
   * Removes the data-cursor-visible attribute from the cursor element
   */
  hide = () => {
    this.el.removeAttribute('data-cursor-visible')

    if (typeof this.config.onHide === 'function') {
      this.config.onHide()
    }
  }

  /**
   * Updates the cursor element position
   * @param {object} coords The coords to move to the cursor to
   * @param {(number|boolean)} inertia The linear interpolation factor
   */
  move = (coords, inertia) => {
    if (typeof coords !== 'object'
      || !coords.hasOwnProperty('x')
      || !coords.hasOwnProperty('y')) return

    const x = inertia ? lerp(this.coords.x, coords.x, inertia) : coords.x
    const y = inertia ? lerp(this.coords.y, coords.y, inertia) : coords.y

    this.coords = { x, y }

    gsap.set(this.el, { x, y, force3D: true })

    if (typeof this.config.onMove === 'function') {
      this.config.onMove(this.coords)
    }
  }

  /**
   * Adds/removes the data-cursor-hover attribute to/from the cursor element
   * @param {(string|null)} trigger The hover trigger
   */
  hover = trigger => {
    if (trigger) {
      this.el.setAttribute('data-cursor-hover', trigger)
    } else {
      this.el.removeAttribute('data-cursor-hover')
    }

    if (typeof this.config.onHover === 'function') {
      this.config.onHover(trigger)
    }
  }

  /**
   * Adds the data-cursor-hold attribute to the cursor element
   */
  hold = () => {
    this.el.setAttribute('data-cursor-hold', '')

    if (typeof this.config.onHold === 'function') {
      this.config.onHold()
    }
  }

  /**
   * Removes the data-cursor-hold class from the cursor element
   */
  release = () => {
    this.el.removeAttribute('data-cursor-hold')

    if (typeof this.config.onRelease === 'function') {
      this.config.onRelease()
    }
  }

  /**
   * Destroys the cursor instance
   */
  destroy() {
    gsap.set(this.el, { clearProps: 'position, top, left, z-index, transform, pointer-events' })

    if ((!touch || options.touch)) {
      gsap.ticker.remove(this.#requestMoveFrame)
    }

    EventManager.off('resize', window, this.#onResize)

    Cursor.#store.unobserve('visible', this.#toggleVisibility)
    Cursor.#store.unobserve('holding', this.#toggleHolding)
    Cursor.#store.unobserve('target', this.#checkTarget)

    if (typeof this.config.onDestroy === 'function') {
      this.config.onDestroy()
    }
  }
}

export default Cursor
