import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import LandingPage from './components/LandingPage'
import TopicFormPage from './components/TopicFormPage'
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
              <Route exact path='/' render={() =>
                this.props.user || window.localStorage.getItem('loggedInUser') ?
                  <LandingPage /> :
                  <LoginPage />
              } />
              <Route path='/create/topic' render={() => <TopicFormPage />} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.loginPage.user
  }
}

const ConnectedApp = connect(mapStateToProps)(App)

export default ConnectedApp
