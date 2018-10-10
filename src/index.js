import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import App from './App'
import store from './reducers/store'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/green'

console.log(store.getState())

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: green,
  },
})

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </ MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
