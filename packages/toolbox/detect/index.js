/**
 * @module detect
 * @package @fiad/toolbox
 * @description A simple collector of device info
 */

import parseUserAgent from 'ua-parser-js'
import getMobileInfo from 'ismobilejs'

const { browser, engine, os } = parseUserAgent(navigator.userAgent)
const { windows, amazon, other, ...mobile } = getMobileInfo(navigator.userAgent)
const touch = 'touchstart' in window

browser.major = parseFloat(browser.major)
browser.modern = 'CSS' in window && 'supports' in window.CSS

export { browser, engine, mobile, os, touch }
