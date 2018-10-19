import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

// Import all reducers here
import testReducer from './testReducer'
import loginPageReducer from './loginPageReducer'
import topicFormPageReducer from './topicFormPageReducer'

// Combine imported reducers
const reducer = combineReducers({
  test: testReducer,
  loginPage: loginPageReducer,
  topicFormPage: topicFormPageReducer
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
