/**
 * @module SmoothScroll
 * @package @fiad/toolbox
 * @description A performing smooth scroll handler not affecting native scroll behaviors
 */

import gsap from 'gsap'
import debounce from 'lodash/debounce'
import { getElement, getElements } from '@fiad/toolbox/dom'
import EventsManager from '@fiad/toolbox/events'
import { lerp } from '@fiad/toolbox/math'

class SmoothScroll {
  /**
   * @constructor
   * @param {(object|null)} config The configuration object 
   */
  constructor({ inertia = 0.2 } = {}) {
    this.root = document.body
    this.wrapper = getElement('[data-scroll-wrapper]')
    this.content = getElement('[data-scroll-content]')
    this.items = getElements('[data-scroll-item]', { enhanced: true })
    this.y = window.scrollY
    this.inertia = inertia
  }

  /**
   * Scroll target element(s) getter
   */
  get target() {
    return this.items.length
      ? this.items.filter(el => el.inViewport())
      : this.content
  }

  /**
   * Root element height setter
   */
  setRootHeight = () => {
    gsap.set(this.root, { height: this.content.clientHeight })
  }

  /**
   * Resize event handler
   */
  onResize = debounce(this.setRootHeight, 300)

  /**
   * Request animation frame handler
   */
  requestScrollFrame = () => {
    this.y = lerp(this.y, window.scrollY, this.inertia)
    gsap.set(this.target, { y: -this.y })
  }

  /**
   * Initializes component
   */
  init() {    
    if (this.wrapper && this.content) {
      this.enabled = true
      this.setRootHeight()

      gsap.set(this.root, { overscrollBehavior: 'none' })
      gsap.set(this.wrapper, {
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0
      })

      EventsManager.on('resize', window, this.onResize)
      gsap.ticker.add(this.requestScrollFrame)
    }
  }

  /**
   * Destroys component
   */
  destroy() {
    if (this.enabled) {
      EventsManager.off('resize', window, this.onResize)
  
      gsap.ticker.remove(this.requestScrollFrame)
      gsap.set(this.root, { clearProps: 'height, overflow-behavior' })
      gsap.set(this.wrapper, { clearProps: 'width, height, position, top, left' })
      gsap.set(this.target, { clearProps: 'x, y' })
    }
  }
}

/**
 * Exporting as singleton
 */
let instance = null

export default {
  enable: config => {
    if (!instance) {
      instance = new SmoothScroll(config)
      instance.init()
    }
  },
  disable: () => {
    if (instance) {
      instance.destroy()
      instance = null
    }
  }
}
