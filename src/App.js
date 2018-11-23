import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import './App.css'

// Components
import LoginPage from './components/LoginPage'
import LandingPage from './components/LandingPage'
import TopicFormPage from './components/TopicFormPage'
import TopicListPage from './components/TopicListPage'
import ViewTopicPage from './components/ViewTopicPage'
import NavigationBar from './components/common/NavigationBar'
import Notification from './components/common/Notification'
import LoadingSpinner from './components/common/LoadingSpinner'

// Actions
import appActions from './reducers/actions/appActions'
import notificationActions from './reducers/actions/notificationActions'
import loginPageActions from './reducers/actions/loginPageActions'
import tokenCheckService from './services/tokenCheck'


class App extends Component {
  constructor(props) {
    super(props)

    this.logout = this.logout.bind(this)
  }

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

  logout() {
    this.props.updateIsLoading(true)
    window.localStorage.clear()
    this.props.updateUser('')
    window.location.reload()
    this.props.updateIsLoading(false)
  }

  render() {
    if (this.props.isLoading) {
      return (
        <LoadingSpinner />
      )
    }

    return (
      <Router>
        <div id="app-wrapper">
          <NavigationBar logout={this.logout} />
          <Notification type={this.props.type} message={this.props.message} open={this.props.open} />
          <div id="app-content">
            <Switch>
              <Route path={process.env.PUBLIC_URL + '/login'} render={() => (
                this.props.user ?
                  <Redirect to={process.env.PUBLIC_URL + '/'} /> :
                  <LoginPage />
              )} />
              <Route exact path={process.env.PUBLIC_URL + '/topics'} render={() => <TopicListPage />} />
              <Route exact path={process.env.PUBLIC_URL + '/topics/create'} render={() => <TopicFormPage />} />
              <Route exact path={process.env.PUBLIC_URL + '/topics/:id'} render={(props) => <ViewTopicPage {...props} />} />
              <AuthRoute path={process.env.PUBLIC_URL + '/'} user={this.props.user} component={LandingPage} />
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
      typeof props.user === 'undefined' || props.user === null ?
        <Redirect
          to={{
            pathname: process.env.PUBLIC_URL + '/login'
          }}
        />
        :
        <Component {...props} />
    )}
  />
)
