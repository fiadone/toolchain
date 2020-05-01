/**
 * @module ShareManager
 * @package @fiad/toolbox
 * @description A simple social sharing management utility
 */

import Stream from '@fiad/toolbox/stream'
import { capitalize } from '@fiad/toolbox/strings'
import EventsManager from '@fiad/toolbox/events'
import * as generators from './generators'

class ShareManager {
  /**
   * Handles the click on a trigger element
   * @private
   * @static
   * @param {Event} e The triggered click event
   */
  static #onTriggerClick(e) {
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
  }
  /**
   * Enables a listener to handle clicks on trigger elements
   */
  static listenClicks() {
    EventsManager.on('click', document.body, ShareManager.#onTriggerClick, { delegateTo: '[data-share-target]' })
  }

  /**
   * Disables the listener that handles clicks on trigger elements
   */
  static unlistenClicks() {
    EventsManager.off('click', document.body, ShareManager.#onTriggerClick, { delegateTo: '[data-share-target]' })
  }

  /**
   * Generates share url for the given target
   * @param {object} options The share options
   */
  static generateUrl({ target, ...data } = {}) {
    const generator = target ? generators[target] : generators.custom

    if (!generator) {
      Stream.log('Unable to generate share link: invalid arguments.', {
        type: 'warn',
        namespace: '@fiad',
        context: 'share'
      })
      return
    }

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
