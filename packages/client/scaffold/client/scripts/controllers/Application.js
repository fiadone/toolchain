class Application {
  /**
   * @constructor
   * @param {any} props
   */
  constructor(props) {
    this.props = props
    console.log('Application init')
  }
}

let instance

export default {
  init: props => {
    if (!instance) {
      instance = new Application(props)
    }
  },
  get: () => instance
}
