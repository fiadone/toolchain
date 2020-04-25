/**
 * @module dom
 * @package @fiad/toolbox
 * @description A collection of utility functions to mandage DOM elements
 */

import { clamp } from '@fiad/toolbox/math'

/**
 * Checks if given object belongs to DOM
 * @param {any} object 
 * @returns {boolean}
 */
export function isDOMElement(object) {
  return object instanceof HTMLDocument || object instanceof HTMLElement
}

/**
 * Returns a value between 0 and 1 that tells how much of the target element has currently scrolled over the viewport
 * @param {HTMLElement} el The target element
 * @returns {number}
 */
export function getScrollRatio(el) {
  const { top } = el.getBoundingClientRect()
  const ratio = (window.innerHeight - top) / (window.innerHeight + el.clientHeight)

  return clamp(ratio, 0, 1)
}

/**
 * Returns the size of the element portion intersecting the viewport
 * @param {HTMLElement} el The target element
 * @returns {number}
 */
export function getIntersection(el) {
  const { top } = el.getBoundingClientRect()
  const size = top >= 0 ? window.innerHeight - top : (el.clientHeight - Math.abs(top))
  const ratio = size / el.clientHeight

  return {
    size: clamp(size, 0, el.clientHeight),
    ratio: clamp(ratio, 0, 1)
  }
}

/**
 * Decorates DOM element with utility methods
 * @param {HTMLElement} el The target element
 * @param {object} props Custom enhancing properties
 * @returns {HTMLElement}
 */
export function enhance(el, props = {}) {
  if (!(el instanceof HTMLElement)) return null

  Object.assign(el, {
    ...props,
    scrollRatio: function() {
      return getScrollRatio(this)
    },
    intersection: function() {
      return getIntersection(this)
    }
  })

  return el
}

/**
 * Executes a querySelector over DOM and decorates results
 * @param {string} selector The selector of the element to query DOM of
 * @param {HTMLElement|HTMLDocument} context The root element the query starts from
 * @param {boolean} enhanced Defines if returned element has to be enhanced
 * @returns {HTMLElement}
 */
export function getElement(selector, { context = document, enhanced = false } = {}) {
  const el = context.querySelector(selector)

  return enhanced ? enhance(el) : el
}

/**
 * Executes a querySelectorAll over DOM and decorates results
 * @param {string} selector The selector of the elements to query DOM of
 * @param {(HTMLElement|HTMLDocument)} context The root element the query starts from
 * @param {boolean} enhanced Defines if returned element has to be enhanced
 * @returns {HTMLElement[]}
 */
export function getElements(selector, { context = document, enhanced = false } = {}) {
  const els = context.querySelectorAll(selector)

  return Array.from(els).map(el => (enhanced ? enhance(el) : el))
}

/**
 * Executes a match test to verify if an element matches a collection of selectors
 * @param {HTMLElement} el The target element
 * @param {(string|string[])} selector The selector(s) to perform matching on
 * @returns {(boolean|string)}
 */
export function match(el, selector) {
  if (!el || !selector) return false

  return Array.isArray(selector)
    ? el.matches(selector)
    : selector.find(entry => el.matches(entry)) || false
}

/**
 * Checks if an element has 
 * @param {HTMLElement} el The target element
 * @param {(string|string[])} selector The ancestors selector(s)
 * @returns {boolean}
 */
export function isDescendantOf(el, selector) {
  if (!el || !selector) return false

  return Array.isArray(selector)
    ? selector.some(entry => !!el.closest(entry))
    : !!el.closest(selector)
}
