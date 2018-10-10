import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import ButtonAppBar from './components/common/ButtonAppBar'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ButtonAppBar />
          <Switch>
            <Route exact path='/' render={() => <LoginPage />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
