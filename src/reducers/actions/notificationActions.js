const setError = (message) => {
  return {
    type: 'SET_ERROR',
    payload: message
  }
}

const clearNotifications = () => {
  return {
    type: 'CLEAR_NOTIFICATIONS'
  }
}

export default { setError, clearNotifications }
