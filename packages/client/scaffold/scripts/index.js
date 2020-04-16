import Application from './containers/Application'

Application.init()

// HMR support
if (module.hot) {
  module.hot.accept()
}
