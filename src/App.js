import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import './App.css'

// Components
import AdminPage from './components/AdminPage'
import LoginPage from './components/LoginPage'
import LandingPage from './components/LandingPage'
import TopicFormPage from './components/TopicFormPage'
import TopicListPage from './components/TopicListPage'
import ViewTopicPage from './components/ViewTopicPage'
import RegistrationPage from './components/RegistrationPage'
import ParticipantsPage from './components/ParticipantsPage'
import NavigationBar from './components/common/NavigationBar'
import Notification from './components/common/Notification'
import LoadingSpinner from './components/common/LoadingSpinner'
import QuestionsFormPage from './components/QuestionsFormPage'
import RegistrationManagementPage from './components/RegistrationManagementPage'

// Services
import registrationManagementService from './services/registrationManagement'
import tokenCheckService from './services/tokenCheck'

// Actions
import appActions from './reducers/actions/appActions'
import notificationActions from './reducers/actions/notificationActions'
import loginPageActions from './reducers/actions/loginPageActions'
import registrationmanagementActions from './reducers/actions/registrationManagementActions'

const history = createBrowserHistory({ basename: process.env.PUBLIC_URL })

class App extends Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  componentWillMount() {
    this.fetchRegistrationManagement()
    if (window.localStorage.getItem('loggedInUser')) {
      this.props.updateIsLoading(true)
      this.userCheck()
      this.props.updateIsLoading(false)
    }
  }

  userCheck = async () => {
    let token
    try {
      token = JSON.parse(window.localStorage.getItem('loggedInUser')).token
      await tokenCheckService.userCheck(token)
      this.props.updateUser(
        JSON.parse(window.localStorage.getItem('loggedInUser'))
      )
      return true
    } catch (e) {
      console.log(e.response)
      this.props.updateUser('')
      return false
    }
  }

  fetchRegistrationManagement = async () => {
    try {
      const response = await registrationManagementService.get()
      this.props.setRegistrationManagement(response.registrationManagement)
    } catch (e) {
      console.log('error happened', e)
      this.props.setError(
        'Error fetching registration management configuration'
      )
      setTimeout(() => {
        this.props.clearNotifications()
      }, 5000)
    }
  }

  logout() {
    this.props.updateIsLoading(true)
    window.localStorage.clear()
    this.props.updateUser('')
    this.props.updateIsLoading(false)
    history.push('/login')
  }

  render() {
    let loadingSpinner
    if (this.props.isLoading) {
      loadingSpinner = <LoadingSpinner />
    }

    return (
      <Router history={history}>
        <div id="app-wrapper">
          <NavigationBar logout={this.logout} history={this.history} />
          <Notification
            type={this.props.type}
            message={this.props.message}
            open={this.props.open}
          />
          <div id="app-content">
            {loadingSpinner}
            <Switch>
              <Route
                path="/login"
                render={() =>
                  this.props.user ? (
                    this.props.user.admin ? (
                      <Redirect to="/administration" />
                    ) : (
                      <Redirect to="/" />
                    )
                  ) : (
                    <LoginPage />
                  )
                }
              />
              <Route exact path="/" render={() => <LandingPage />} />
              <Route exact path="/topics" render={() => <TopicListPage />} />
              <Route
                exact
                path="/topics/create"
                render={() => <TopicFormPage />}
              />
              <Route
                exact
                path="/topics/:id"
                render={(props) => <ViewTopicPage {...props} />}
              />
              <Route
                exact
                path="/administration"
                render={() => <AdminPage />}
              />
              <Route
                exact
                path="/administration/participants"
                render={() => <ParticipantsPage />}
              />
              <Route
                exact
                path="/administration/questions"
                render={() => <QuestionsFormPage />}
              />
              <Route
                exact
                path="/register"
                user={this.props.user}
                render={() => <RegistrationPage />}
              />
              <Route
                exact
                path="/administration/registrationmanagement"
                user={this.props.user}
                render={() => <RegistrationManagementPage />}
              />
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
    open: state.notifications.open,
    message: state.notifications.message
  }
}

const mapDispatchToProps = {
  ...notificationActions,
  ...loginPageActions,
  ...appActions,
  ...registrationmanagementActions
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp
