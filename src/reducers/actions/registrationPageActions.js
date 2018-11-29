const updateTopics = (topics) => {
  return {
    type: 'UPDATE_TOPICS',
    payload: topics
  }
}

const updateEmail = (email) => {
  return {
    type: 'UPDATE_EMAIL',
    payload: email
  }
}

export default {
  updateTopics,
  updateEmail
}