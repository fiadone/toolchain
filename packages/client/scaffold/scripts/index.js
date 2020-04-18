import '../styles'

import Application from './controllers/Application'

Application.init()

// HMR support
if (module.hot) {
  module.hot.accept()
}
