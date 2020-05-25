/**
 * @module dom
 * @package @fiad/toolbox
 * @description A collection of utility functions to mandage DOM elements
 */

import { clamp } from '@fiad/toolbox/math'
import { camelCase } from '../strings'

/**
 * Retrieves a filtered dataset from the given DOM element
 * @param {Element} el The element to retrieve dataset from
 * @param {string} prefix The prefix used to filter the dataset
 * @returns {object} The dataset collection
 */
export function getDataset(el, prefix) {
  if (!prefix && el.dataset) return el.dataset

  const regexp = new RegExp(`data-${prefix ? `${prefix}-` : ''}`)
  const attributes = el.getAttributeNames().filter(name => name.match(regexp))

  return attributes.reduce((acc, name) => {
    const key = camelCase(name.replace(regexp))
    acc[key] = el.getAttribute(name)
    return acc
  }, {})
}

/**
 * Returns the size of the element portion intersecting the viewport
 * @param {Element} el The target element
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
 * Returns a value between 0 and 1 that tells how much of the target element has currently scrolled over the viewport
 * @param {Element} el The target element
 * @returns {number}
 */
export function getScrollRatio(el) {
  const { top } = el.getBoundingClientRect()
  const ratio = (window.innerHeight - top) / (window.innerHeight + el.clientHeight)

  return clamp(ratio, 0, 1)
}

/**
 * Decorates DOM element with utility methods
 * @param {Element} el The target element
 * @param {object} props Custom enhancing properties
 * @returns {Element}
 */
export function enhance(el, props = {}) {
  if (!(el instanceof Element)) return null

  if (!el.enhanced) {
    Object.assign(el, {
      ...props,
      enhanced: true,
      getDataset: function(prefix) {
        return getDataset(this, prefix)
      },
      getIntersection: function() {
        return getIntersection(this)
      },
      getScrollRatio: function() {
        return getScrollRatio(this)
      }
    })
  }

  return el
}

/**
 * Executes a querySelector over DOM and decorates results
 * @param {string} selector The selector of the element to query DOM of
 * @param {Element|HTMLDocument} context The root element the query starts from
 * @param {boolean} enhanced Defines if returned element has to be enhanced
 * @returns {Element}
 */
export function getElement(selector, { context = document, enhanced = false } = {}) {
  const el = context.querySelector(selector)

  return enhanced ? enhance(el) : el
}

/**
 * Executes a querySelectorAll over DOM and decorates results
 * @param {string} selector The selector of the elements to query DOM of
 * @param {(Element|HTMLDocument)} context The root element the query starts from
 * @param {boolean} enhanced Defines if returned element has to be enhanced
 * @returns {Element[]}
 */
export function getElements(selector, { context = document, enhanced = false } = {}) {
  const els = context.querySelectorAll(selector)

  return Array.from(els).map(el => (enhanced ? enhance(el) : el))
}

/**
 * Performs a match test to verify if an element matches with a collection of selectors
 * @param {Element} el The target element
 * @param {(string|string[])} selector The selector(s) to perform matching on
 * @returns {(boolean|string)}
 */
export function matches(el, selector) {
  if (!el || !selector) return false

  if (Array.isArray(selector)) {
    return selector.find(entry => !!el.matches(entry)) || false
  }

  return el.matches(selector)
}

/**
 * Checks if an element has the given ancestor(s)
 * @param {Element} el The target element
 * @param {(string|string[])} selector The ancestors selector(s)
 * @returns {boolean}
 */
export function isDescendantOf(el, selector) {
  if (!el || !selector) return false

  if (Array.isArray(selector)) {
    return selector.find(entry => !!el.closest(entry)) || false
  }

  return el.closest(selector)
}
