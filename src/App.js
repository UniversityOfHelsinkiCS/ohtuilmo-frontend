import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css'

// Components
import LoginPage from './components/LoginPage'
import LandingPage from './components/LandingPage'
import TopicFormPage from './components/TopicFormPage'
import TopicListPage from './components/TopicListPage'
import NavigationBar from './components/common/NavigationBar'
import Notification from './components/common/Notification'
import LoadingSpinner from './components/common/LoadingSpinner'

// Actions
import appActions from './reducers/actions/appActions'
import notificationActions from './reducers/actions/notificationActions'
import loginPageActions from './reducers/actions/loginPageActions'
import tokenCheckService from './services/tokenCheck'


class App extends Component {

  componentWillMount() {
    if (window.localStorage.getItem('loggedInUser')) {
      this.props.updateIsLoading(true)
      this.userCheck()
    }
  }

  userCheck = async () => {
    let token
    try {
      token = JSON.parse(window.localStorage.getItem('loggedInUser')).token
      await tokenCheckService.userCheck(token)
      this.props.updateUser(JSON.parse(window.localStorage.getItem('loggedInUser')))
      this.props.updateIsLoading(false)
      return true
    } catch (e) {
      console.log(e.response)
      this.props.updateUser('')
      return false
    }
  }

  render() {
    if (this.props.isLoading) {
      return (
        <LoadingSpinner />
      )
    }
    console.log(this.props.user)

    return (
      <Router>
        <div id="app-wrapper">
          <NavigationBar />
          <Notification type={this.props.type} message={this.props.message} open={this.props.open}/>
          <div id="app-content">
            <Switch>
              <Route path='/login' render={() => (
                this.props.user?
                  <Redirect to='/' /> :
                  <LoginPage />
              )} />
              <Route path='/topics/create' render={() => <TopicFormPage />} />
              <Route path='/topics' render={() => <TopicListPage />} />
              <AuthRoute path='/' user={this.props.user} component={LandingPage} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.app.isLoading,
    user: state.loginPage.user,
    type: state.notifications.type,
    message: state.notifications.message,
    open: state.notifications.open
  }
}

const mapDispatchToProps = {
  ...notificationActions,
  ...loginPageActions,
  ...appActions
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp


const AuthRoute = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={() => (
      typeof props.user === 'undefined' || props.user === null?
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
        :
        <Component {...props}/>
    )}
  />
)
