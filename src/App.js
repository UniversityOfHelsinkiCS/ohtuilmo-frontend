import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import LandingPage from './components/LandingPage'
import TopicFormPage from './components/TopicFormPage'
import NavigationBar from './components/common/NavigationBar'
import Notification from './components/common/Notification'
import notificationActions from './reducers/actions/notificationActions'
import './App.css'

class App extends Component {

  render() {
    return (
      <Router>
        <div id="app-wrapper">
          <NavigationBar />
          <Notification type={this.props.type} message={this.props.message} open={this.props.open}/>
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
    user: state.loginPage.user,
    type: state.notifications.type,
    message: state.notifications.message,
    open: state.notifications.open
  }
}

const mapDispatchToProps = {
  ...notificationActions
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp
