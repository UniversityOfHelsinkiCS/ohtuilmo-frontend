const setTopic = (topic) => {
  return {
    type: 'SET_TOPIC',
    payload: topic
  }
}

export default {
  setTopic
}