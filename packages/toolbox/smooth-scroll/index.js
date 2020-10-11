/**
 * @module SmoothScroll
 * @package @fiad/toolbox
 * @description A performing smooth scroll handler not affecting native scroll behaviors
 */

import gsap from 'gsap'

class SmoothScroll {
  /**
   * The scroll container
   * @type {HTMLElement}
   * @private
   */
  #container = document.querySelector('[data-smooth-scroll]')

  /**
   * The current scroll position
   * @type {number}
   * @private
   */
  #scrollTop = document.documentElement.scrollTop

  /**
   * The on scroll handler
   * @type {function}
   * @private
   */
  #onScroll

  /**
   * Root element height setter
   */
  #setRootHeight = () => {
    gsap.set(document.body, { height: this.#container.clientHeight })
  }

  /**
   * Request animation frame handler
   */
  #requestScrollFrame = () => {
    const factor = 1 - this.intensity
    const y = gsap.utils.interpolate(this.#scrollTop, document.documentElement.scrollTop, factor)
    this.scrollTo(y)
  }

  /**
   * Initializes component
   */
  #init = () => {
    if (!this.#container) return

    this.#setRootHeight()

    gsap.set(document.body, { overscrollBehavior: 'none' })
    gsap.set(this.#container, {
      width: '100%',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0
    })

    window.addEventListener('resize', this.#setRootHeight)
    gsap.ticker.add(this.#requestScrollFrame)
  }

  /**
   * @constructor
   * @param {(object|null)} config The configuration object
   */
  constructor({ intensity = 0.85, onScroll } = {}) {
    this.intensity = intensity

    if (typeof onScroll === 'function') {
     this.#onScroll = onScroll
    }

    this.#init()
  }

  /**
   * Scroll top getter
   */
  get scrollTop() {
    return this.#scrollTop
  }

  /**
   * Updates scroll position
   * @param {number} y
   */
  scrollTo = y => {
    if (y === this.y || typeof y !== 'number') return

    this.#scrollTop = y

    gsap.set(this.#container, {
      overflow: 'hidden',
      position: 'fixed',
      y: -this.#scrollTop,
      force3D: true,
      onComplete: this.#onScroll
    })
  }

  /**
   * Destroys component
   */
  destroy = () => {
    window.removeEventListener('resize', this.#setRootHeight)
    gsap.ticker.remove(this.#requestScrollFrame)
    gsap.set(document.body, { clearProps: 'height, overscrollBehavior' })
    gsap.set(this.#container, { clearProps: 'width, height, position, top, left' })
  }
}

export default SmoothScroll
