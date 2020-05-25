import { getElements, getDataset } from '../dom'
import Component from './'

/**
 * Attaches components to DOM elements
 * @param {object} components The components mapping object
 * @param {(HTMLDocument|Element)} root The components root element
 * @returns {Map} The component instances collection
 */
export function attachComponents(components = {}, root = document) {
  const instances = new Map()

  getElements('[data-component]', { context: root }).forEach(el => {
    const { component: key } = getDataset(el)
    const component = key ? components[key] : null

    if (!component || (!(component.prototype instanceof Component) && !component.handler)) return

    let C = component
    let config = {}

    if (!(C.prototype instanceof Component)) {
      const { handler, ...rest } = component
      C = handler
      config = rest
    }

    instances.set(el, new C(el, config))
  })

  return instances
}

/**
 * Detaches components from DOM elements
 * @param {Map} components The component instances map
 */
export function detachComponents(components) {
  if (!(components instanceof Map)) return

  components.forEach((component, el) => {
    component.destroy()
    components.delete(el)
  })
}
