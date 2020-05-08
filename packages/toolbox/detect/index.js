/**
 * @module detect
 * @package @fiad/toolbox
 * @description A simple collector of device info
 */

import parseUserAgent from 'ua-parser-js'
import getMobileInfo from 'ismobilejs'

/**
 * Collects device info
 * @param {string} userAgent The user agent string
 * @returns {object}
 */
function detect(userAgent = navigator.userAgent) {
  const { browser, engine, os } = parseUserAgent(userAgent)
  const { windows, amazon, other, ...mobile } = getMobileInfo(userAgent)
  const info = { browser, engine, mobile, os }

  // prevent errors in ssr
  if (typeof window !== 'undefined') {
    info.touch = 'touchstart' in window
    // adding modern flag according to CSS.supports API support
    info.browser.modern = 'CSS' in window && 'supports' in window.CSS
  }

  return info
}

export default detect()
export { detect }
