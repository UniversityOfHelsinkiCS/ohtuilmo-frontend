import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

// Import all reducers here
import testReducer from './testReducer'

// Combine imported reducers
const reducer = combineReducers({
    test: testReducer
})
 
const store = createStore(
    reducer,
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
    console.log(store.getState())
}) 

export default store