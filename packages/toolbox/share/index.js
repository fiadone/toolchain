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
    EventsManager.on('click', document.body, ShareManager.#onTriggerClick, { delegateTo: '[data-share]' })
  }

  /**
   * Disables the listener that handles clicks on trigger elements
   */
  static unlistenClicks() {
    EventsManager.off('click', document.body, ShareManager.#onTriggerClick, { delegateTo: '[data-share]' })
  }

  /**
   * Generates share url for the given target
   * @param {string} target The platform to share on
   * @param {object} data The data to be shared
   */
  static generateUrl(target, data = {}) {
    if (!generators[target]) {
      Stream.log(`Unable to generate share link: unknown platform "${target}".`, {
        type: 'warn',
        namespace: '@fiad',
        context: 'share'
      })
      return
    }

    return generators[target](data)
  }

  /**
   * Opens the share dialog
   * @param {object} config The share configuration object
   */
  static share({ target, ...args }) {
    const url = ShareManager.generateUrl(target, args)

    if (url) {
      window.open(url, '_blank', 'width=640,height=480')
    }
  }
}

export default ShareManager
