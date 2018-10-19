import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import NewTopicForm from './components/NewTopicForm'
import ButtonAppBar from './components/common/ButtonAppBar'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div id="app-wrapper">
          <ButtonAppBar />
          <div id="app-content">
            <Switch>
              <Route exact path='/' render={() => <LoginPage />} />
              <Route path='/create/topic' render={() => <NewTopicForm />} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
