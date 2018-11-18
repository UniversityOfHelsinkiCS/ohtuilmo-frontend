import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

// Import all reducers here
import appReducer from './appReducer'
import loginPageReducer from './loginPageReducer'
import topicListPageReducer from './topicListPageReducer'
import notificationReducer from './notificationReducer'
import topicFormReducer from './topicFormReducer'
import viewTopicPageReducer from './viewTopicPageReducer'

// Combine imported reducers
const reducer = combineReducers({
  app: appReducer,
  loginPage: loginPageReducer,
  topicFormPage: topicFormReducer('SUBMIT'),
  topicEditPage: topicFormReducer('EDIT'),
  topicListPage: topicListPageReducer,
  notifications: notificationReducer,
  viewTopicPage: viewTopicPageReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default store
