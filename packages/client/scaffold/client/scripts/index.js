import { browser } from '@fiad/toolbox/detect'
import Application from './controllers/Application'
import '../styles'

if (!browser.modern) {
  document.body.classList.add('unsupported')
} else {
  Application.init()
}

// HMR support
if (module.hot) {
  module.hot.accept()
}
