import {
  capitalize,
  uncapitalize,
  camelCase,
  pascalCase,
  snakeCase,
  kebabCase
} from '@fiad/toolbox/strings'

test('Should capitalize the string', () => {
  const transformed = capitalize('string')
  expect(transformed).toBe('String')
})

test('Should uncapitalize the string', () => {
  const transformed = uncapitalize('String')
  expect(transformed).toBe('string')
})

test('Should make the string camel-case', () => {
  const transformed = camelCase('string example')
  expect(transformed).toBe('stringExample')
})

test('Should make the string pascal-case', () => {
  const transformed = pascalCase('string example')
  expect(transformed).toBe('StringExample')
})

test('Should make the string snake-case', () => {
  const transformed = snakeCase('String Example')
  expect(transformed).toBe('string_example')
})

test('Should make the string kebab-case', () => {
  const transformed = kebabCase('String Example')
  expect(transformed).toBe('string-example')
})