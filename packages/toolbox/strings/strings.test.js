import {
  capitalize,
  uncapitalize,
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase
} from '@fiad/toolbox/strings'

test('It should capitalize the given string', () => {
  const result = capitalize('string')
  expect(result).toBe('String')
})

test('It should uncapitalize the given string', () => {
  const result = uncapitalize('String')
  expect(result).toBe('string')
})

test('It should make the given string camel-case', () => {
  const result = camelCase('string example')
  expect(result).toBe('stringExample')
})

test('It should make the given string pascal-case', () => {
  const result = pascalCase('string example')
  expect(result).toBe('StringExample')
})

test('It should make the given string snake-case', () => {
  const result = snakeCase('String Example')
  expect(result).toBe('string_example')
})

test('It should make the given string kebab-case', () => {
  const result = kebabCase('String Example')
  expect(result).toBe('string-example')
})
