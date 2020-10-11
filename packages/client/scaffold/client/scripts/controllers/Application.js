import { browser } from '@fiad/toolbox/detect'

class Application {
  /**
   * @constructor
   * @param {any} props
   */
  constructor(props) {
    this.props = props

    if (!browser.modern) {
      document.body.classList.add('unsupported')
    }

    this.show()

    window.addEventListener('beforeunload', this.hide)
  }

  /**
   * It reveals the page
   */
  show() {
    document.body.classList.remove('hidden')
  }

  /**
   * It unveils the page
   */
  hide() {
    document.body.classList.add('hidden')
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
