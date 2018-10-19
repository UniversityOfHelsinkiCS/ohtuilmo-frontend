import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import TopicFormPage from './components/topicFormPage'
import NavigationBar from './components/common/NavigationBar'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router>
        <div id="app-wrapper">
          <NavigationBar />
          <div id="app-content">
            <Switch>
              <Route exact path='/' render={() => <LoginPage />} />
              <Route path='/create/topic' render={() => <TopicFormPage />} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
