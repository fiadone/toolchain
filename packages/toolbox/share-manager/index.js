/**
 * @module ShareManager
 * @package @fiad/toolbox
 * @description A simple social sharing management utility
 */

import delegate from '@fiad/toolbox/utils/delegate'
import { capitalize } from '@fiad/toolbox/utils/string'
import * as generators from './generators'

class ShareManager {
  /**
   * Handles the click on a trigger element
   * @private
   * @static
   * @param {Event} e The triggered click event
   */
  static #onTriggerClick = delegate(e => {
    e.preventDefault()

    ShareManager.share(
      Object
        .entries(e.target.dataset)
        .filter(([ key ]) => key.match(/^Share[A-Za-z]+$/))
        .reduce((acc, [key, value]) => {
          acc[capitalize(key)] = value
          return acc
        }, {})
    )
  }, '[data-share-target]')
  /**
   * Enables a listener to handle clicks on trigger elements
   */
  static listenClicks() {
    document.body.addEventListener('click', ShareManager.#onTriggerClick)
  }

  /**
   * Disables the listener that handles clicks on trigger elements
   */
  static unlistenClicks() {
    document.body.removeEventListener('click', ShareManager.#onTriggerClick)
  }

  /**
   * Generates share url for the given target
   * @param {object} options The share options
   */
  static generateUrl({ target, ...data } = {}) {
    const generator = target ? generators[target] : generators.custom
    return generator(data)
  }

  /**
   * Opens the share dialog
   * @param {object} options The share configuration object
   */
  static share(options) {
    const url = ShareManager.generateUrl(options)

    if (url) {
      window.open(url, '_blank', 'width=640,height=480')
    }
  }
}

export default ShareManager
