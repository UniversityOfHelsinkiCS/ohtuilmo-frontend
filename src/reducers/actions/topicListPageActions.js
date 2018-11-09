const updateTopics = (topics) => {
  return {
    type: 'UPDATE_TOPICS',
    payload: topics
  }
}

export default {
  updateTopics
}