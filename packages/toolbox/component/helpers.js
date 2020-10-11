import Component from './'

/**
 * Attaches components to DOM elements
 * @param {object} components The components mapping object
 * @param {(HTMLDocument|Element)} root The components root element
 * @returns {Map} The component instances collection
 */
export function attach(components = {}, root = document) {
  const instances = {}

  root.querySelectorAll('[data-component]').forEach(el => {
    const { component: name } = el.dataset
    const component = name ? components[name] : null

    if (!component || (!(component.prototype instanceof Component) && !component.handler)) return

    let C = component
    let config = {}
    let key = `${name.charAt(0).toLowerCase()}${name.slice(1)}`

    if (!(C.prototype instanceof Component)) {
      const { key: alias, handler, ...rest } = component
      C = handler
      config = rest

      if (alias) {
        key = alias
      }
    }

    instances[key] = new C(el, config)
  })

  return instances
}

/**
 * Detaches components from DOM elements
 * @param {object} components The component instances map
 */
export function detach(components = {}) {
  Object.entries(components).forEach(([key, component]) => {
    try { component.destroy() } catch {}
    delete components[key]
  })
}
