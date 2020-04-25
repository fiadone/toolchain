import {
  capitalize,
  uncapitalize,
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase
} from '@fiad/toolbox/strings'

test('Should capitalize the string', () => {
  const result = capitalize('string')
  expect(result).toBe('String')
})

test('Should uncapitalize the string', () => {
  const result = uncapitalize('String')
  expect(result).toBe('string')
})

test('Should make the string camel-case', () => {
  const result = camelCase('string example')
  expect(result).toBe('stringExample')
})

test('Should make the string pascal-case', () => {
  const result = pascalCase('string example')
  expect(result).toBe('StringExample')
})

test('Should make the string snake-case', () => {
  const result = snakeCase('String Example')
  expect(result).toBe('string_example')
})

test('Should make the string kebab-case', () => {
  const result = kebabCase('String Example')
  expect(result).toBe('string-example')
})