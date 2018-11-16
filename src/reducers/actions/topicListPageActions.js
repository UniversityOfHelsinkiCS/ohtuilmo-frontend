const updateTopics = (topics) => {
  return {
    type: 'UPDATE_TOPICS',
    payload: topics
  }
}
const updateFilter = (filter) => {
  return {
    type: 'UPDATE_FILTER',
    payload: filter
  }
}

export default {
  updateTopics,
  updateFilter
}