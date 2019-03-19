import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

// Import all reducers here
import appReducer from './appReducer'
import loginPageReducer from './loginPageReducer'
import topicListPageReducer from './topicListPageReducer'
import notificationReducer from './notificationReducer'
import topicFormReducer from './topicFormReducer'
import viewTopicPageReducer from './viewTopicPageReducer'
import registrationPageReducer from './registrationPageReducer'
import adminPageReducer from './adminPageReducer'
import questionsFormPageReducer from './questionsFormPageReducer'
import registrationQuestionsPageReducer from './registrationQuestionsPageReducer'
import peerReviewQuestionsPageReducer from './peerReviewQuestionsPageReducer'
import registrationManagementReducer from './registrationManagementReducer'
import registrationReducer from './registrationReducer'
import groupPageReducer from './groupPageReducer'
import peerReviewReducer from './peerReviewReducer'
import myGroupReducer from './myGroupReducer'

// Combine imported reducers
const reducer = combineReducers({
  app: appReducer,
  loginPage: loginPageReducer,
  topicFormPage: topicFormReducer,
  topicListPage: topicListPageReducer,
  notifications: notificationReducer,
  viewTopicPage: viewTopicPageReducer,
  registrationPage: registrationPageReducer,
  adminPage: adminPageReducer,
  questionsFormPage: questionsFormPageReducer,
  registrationQuestionsPage: registrationQuestionsPageReducer,
  peerReviewQuestionsPage: peerReviewQuestionsPageReducer,
  registrationManagement: registrationManagementReducer,
  registration: registrationReducer,
  groupPage: groupPageReducer,
  peerReviewPage: peerReviewReducer,
  registrationDetails: myGroupReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store
