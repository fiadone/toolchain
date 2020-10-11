import '../styles'
import Application from './controllers/Application'

window.addEventListener('load', Application.init)

// supporting HMR
if (module.hot) {
  module.hot.accept()
}
