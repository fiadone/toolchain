import { browser } from '@fiad/toolbox/detect'
import Application from './controllers/Application'
import '../styles'

// checking browser
if (!browser.modern) {
  document.body.classList.add('unsupported')
} else {
  Application.init()
}

// supporting HMR
if (module.hot) {
  module.hot.accept()
}
