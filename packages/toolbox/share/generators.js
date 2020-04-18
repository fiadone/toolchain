/**
 * @module generators
 * @package @fiad/toolbox/share
 * @description A collection of share url generators
 */

/**
 * Whatsapp share link generator
 * @param {object} data The data to be shared
 */
export function whatsapp({ url, description }) {
  const text = description ? `${description} ${url}` : url
  return `https://wa.me/?text=${encodeURIComponent(text)}`
}

/**
 * Telegram share link generator
 * @param {object} data The data to be shared
 */
export function telegram({ url, description }) {
  const queryString = `?url=${url}&text=${description}`
  return `https://telegram.me/share/url${encodeURIComponent(queryString)}`
}

/**
 * Facebook share link generator
 * @param {object} data The data to be shared
 */
export function facebook({ url }) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
}

/**
 * Twitter share link generator
 * @param {object} data The data to be shared
 */
export function twitter({ url, description }) {
  const status = description ? `${url} ${description}` : url
  return `https://twitter.com/home?status=${encodeURIComponent(status)}`
}

/**
 * Google+ share link generator
 * @param {object} data The data to be shared
 */
export function googleplus({ url }) {
  return `https://plus.google.com/share?url=${encodeURIComponent(url)}`
}

/**
 * LinkedIn share link generator
 * @param {object} data The data to be shared
 */
export function linkedin({ url, title, description }) {
  const queryString = `?mini=true&url=${url}&title=${title}&summary=${description}`
  return `https://www.linkedin.com/shareArticle${encodeURIComponent(queryString)}`
}

/**
 * Mail share link generator
 * @param {object} data The data to be shared
 */
export function mail({ url, title, description }) {
  const body = description ? `${url} ${description}` : url
  return `mailto:?subject=${title}&body=${body}`
}
