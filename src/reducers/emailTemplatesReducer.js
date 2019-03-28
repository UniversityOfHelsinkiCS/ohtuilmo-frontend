import { combineReducers } from 'redux'

const isLoading = (state = true, action) => {
  switch (action.type) {
  case 'FETCH_EMAIL_TEMPLATES_REQUEST':
    return true
  case 'FETCH_EMAIL_TEMPLATES_SUCCESS':
  case 'FETCH_EMAIL_TEMPLATES_FAILED':
    return false
  default:
    return state
  }
}

const initialTemplatesState = {
  topicAccepted: {
    finnish: '',
    english: ''
  },
  topicRejected: {
    finnish: '',
    english: ''
  }
}

const templates = (state = initialTemplatesState, action) => {
  switch (action.type) {
  case 'FETCH_EMAIL_TEMPLATES_SUCCESS':
    return action.payload
  default:
    return state
  }
}

export default combineReducers({
  isLoading,
  templates
})
