const fetchTopics = (topics) => {
  return {
    type: 'FETCH_TOPICS',
    payload: topics
  }
}

export default {
  fetchTopics
}