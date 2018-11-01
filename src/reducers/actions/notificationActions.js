const setError = (message) => {
  return {
    type: 'SET_ERROR',
    payload: message
  }
}

const setSuccess = (message) => {
  return {
    type: 'SET_SUCCESS',
    payload: message
  }
}

const setInfo = (message) => {
  return {
    type: 'SET_INFO',
    payload: message
  }
}

const clearNotifications = () => {
  return {
    type: 'CLEAR_NOTIFICATIONS'
  }
}

export default { setError, setSuccess, setInfo, clearNotifications }
