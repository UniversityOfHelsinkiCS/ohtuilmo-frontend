import { combineReducers } from 'redux'

const filter = (state = 0, action) => {
  switch (action.type) {
  case 'TOPIC_PAGE_UPDATE_FILTER':
    return action.payload
  default:
    return state
  }
}

const topicsIsLoading = (state = true, action) => {
  switch (action.type) {
  case 'TOPIC_PAGE_FETCH_TOPICS_REQUEST':
    return true
  case 'TOPIC_PAGE_FETCH_TOPICS_SUCCESS':
  case 'TOPIC_PAGE_FETCH_TOPICS_FAILED':
    return true
  default:
    return state
  }
}

const topicsData = (state = [], action) => {
  switch (action.type) {
  case 'TOPIC_PAGE_FETCH_TOPICS_SUCCESS':
    return action.payload
  default:
    return state
  }
}

const topics = combineReducers({
  isLoading: topicsIsLoading,
  data: topicsData
})

export default combineReducers({
  filter,
  topics
})
