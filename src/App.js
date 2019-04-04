import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import './App.css'

// Components
import ConfigurationPage from './components/ConfigurationPage'
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
import RegistrationQuestionsPage from './components/RegistrationQuestionsPage'
import PeerReviewQuestionsPage from './components/PeerReviewQuestionsPage'
import RegistrationManagementPage from './components/RegistrationManagementPage'
import RegistrationDetailsPage from './components/RegistrationDetailsPage'
import GroupManagementPage from './components/GroupManagementPage'
import PeerReviewPage from './components/PeerReviewPage'

// Services
import tokenCheckService from './services/tokenCheck'

// Actions
import appActions from './reducers/actions/appActions'
import * as notificationActions from './reducers/actions/notificationActions'
import loginPageActions from './reducers/actions/loginPageActions'
import registrationmanagementActions from './reducers/actions/registrationManagementActions'
import registrationActions from './reducers/actions/registrationActions'
import peerReviewPageActions from './reducers/actions/peerReviewPageActions'

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

  fetchRegistrationManagement = async () => {
    try {
      await this.props.fetchRegistrationManagement()
    } catch (e) {
      console.log('error happened', e)
      this.props.setError(
        'Error fetching registration management configuration',
        5000
      )
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

  logout() {
    this.props.updateIsLoading(true)
    window.localStorage.clear()
    this.props.updateUser('')
    this.props.clearRegistration()
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
          <NavigationBar logout={this.logout} />
          <Notification />
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
              <Route
                exact
                path="/"
                render={() =>
                  this.props.user ? <LandingPage /> : <Redirect to="/login" />
                }
              />
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
                path="/administration/configuration"
                render={() => <ConfigurationPage />}
              />
              <Route
                exact
                path="/administration/participants"
                render={() => <ParticipantsPage />}
              />
              <Route
                exact
                path="/administration/peer-review-questions"
                render={() => <PeerReviewQuestionsPage />}
              />
              <Route
                exact
                path="/administration/registration-questions"
                render={() => <RegistrationQuestionsPage />}
              />
              <Route
                exact
                path="/administration/groups"
                render={() => <GroupManagementPage />}
              />
              <Route
                exact
                path="/register"
                user={this.props.user}
                render={() => <RegistrationPage />}
              />
              <Route
                exact
                path="/peerreview"
                user={this.props.user}
                render={() => <PeerReviewPage />}
              />
              <Route
                exact
                path="/administration/registrationmanagement"
                render={() => <RegistrationManagementPage />}
              />

              <Route
                exact
                path="/registrationdetails"
                render={() =>
                  this.props.user ? (
                    <RegistrationDetailsPage />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
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
    user: state.loginPage.user
  }
}

const mapDispatchToProps = {
  setError: notificationActions.setError,
  ...loginPageActions,
  ...appActions,
  fetchRegistrationManagement:
    registrationmanagementActions.fetchRegistrationManagement,
  clearRegistration: registrationActions.clearRegistration,
  ...peerReviewPageActions
}

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp
