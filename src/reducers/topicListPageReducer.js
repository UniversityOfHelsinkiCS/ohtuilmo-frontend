import { combineReducers } from 'redux'

const filter = (state = 0, action) => {
  switch (action.type) {
  case 'TOPIC_PAGE_UPDATE_FILTER':
    return action.payload
  default:
    return state
  }
}

const isTopicsLoading = (state = false, action) => {
  switch (action.type) {
  case 'TOPIC_PAGE_FETCH_TOPICS_REQUEST':
    return true
  case 'TOPIC_PAGE_FETCH_TOPICS_SUCCESS':
  case 'TOPIC_PAGE_FETCH_TOPICS_FAILED':
    return false
  default:
    return state
  }
}

const isUpdateLoading = (state = false, action) => {
  switch (action.type) {
  case 'TOPIC_PAGE_UPDATE_TOPIC_REQUEST':
    return true
  case 'TOPIC_PAGE_UPDATE_TOPIC_SUCCESS':
  case 'TOPIC_PAGE_UPDATE_TOPIC_FAILED':
    return false
  default:
    return state
  }
}

const updateTopic = (topics, updatedTopic) =>
  topics.map((topic) => (topic.id === updatedTopic.id ? updatedTopic : topic))

const topics = (state = [], action) => {
  switch (action.type) {
  case 'TOPIC_PAGE_FETCH_TOPICS_SUCCESS':
    return action.payload
  case 'TOPIC_PAGE_UPDATE_TOPIC_SUCCESS':
    return updateTopic(state, action.payload)
  default:
    return state
  }
}

export default combineReducers({
  filter,
  topics,
  isTopicsLoading,
  isUpdateLoading
})
