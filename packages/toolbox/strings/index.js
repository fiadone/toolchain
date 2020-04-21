/**
 * @module strings
 * @package @fiad/toolbox
 * @description A collection of utility functions for strings manipulation
 */

/**
 * Splits given string into an array of words
 * @private
 * @param {string} string The string to be splitted
 * @returns {string} The transformed string
 */
function deconstruct(string) {
  return string.split(' ').map(word => word.trim())
}

/**
 * Makes the first letter of the given string uppercase
 * @param {string} string The string to be transformed
 * @returns {string} The transformed string
 * @example
 * capitalize('my string') --> 'My String'
 */
export function capitalize(string) {
  return deconstruct(string)
    .map(entry => (entry.charAt(0).toUpperCase() + entry.slice(1)))
    .join(' ')
}

/**
 * Makes the first letter of the given string lowercase
 * @param {string} string The string to be transformed
 * @returns {string} The transformed string
 * @example
 * uncapitalize('My String') --> 'my string'
 */
export function uncapitalize(string) {
  return deconstruct(string)
    .map(entry => (entry.charAt(0).toLowerCase() + entry.slice(1)))
    .join(' ')
}

/**
 * Rewrites the given string in camel-case
 * @param {string} string The string to be transformed
 * @returns {string} The transformed string
 * @example
 * camelCase('my string') --> 'myString'
 */
export function camelCase(string) {
  return deconstruct(string)
    .map((word, i) => (i > 0) ? capitalize(word) : uncapitalize(word))
    .join()
}

/**
 * Rewrites the given string in pascal-case
 * @param {string} string The string to be transformed
 * @returns {string} The transformed string
 * @example
 * pascalCase('my string') --> 'MyString'
 */
export function pascalCase(string) {
  return capitalize(camelCase(string))
}

/**
 * Rewrites the given string in snake-case
 * @param {string} string The string to be transformed
 * @returns {string} The transformed string
 * @example
 * snakeCase('my string') --> 'my_string'
 */
export function snakeCase(string) {
  return deconstruct(string).join('_')
}

/**
 * Rewrites the given string in kebab-case
 * @param {string} string The string to be transformed
 * @returns {string} The transformed string
 * @example
 * kebabCase('my string') --> 'my-string'
 */
export function kebabCase(string) {
  return deconstruct(string).join('-')
}
