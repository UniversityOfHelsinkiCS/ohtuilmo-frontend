import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

// Import all reducers here
import testReducer from './testReducer'
import loginPageReducer from './loginPageReducer'
import topicListPageReducer from './topicListPageReducer'
import notificationReducer from './notificationReducer'
import topicFormReducer from './topicFormReducer'

// Combine imported reducers
const reducer = combineReducers({
  test: testReducer,
  loginPage: loginPageReducer,
  topicFormPage: topicFormReducer('SUBMIT'),
  topicEditPage: topicFormReducer('EDIT'),
  topicListPage: topicListPageReducer,
  notifications: notificationReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

store.subscribe(() => {
  console.log(store.getState())
})

export default store
