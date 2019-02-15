const clearNotifications = () => {
  return {
    type: 'CLEAR_NOTIFICATIONS'
  }
}

const setNotification = (message, type) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: { message, type }
  }
}

const setError = (message) => {
  return setNotification(message, 'error')
}

const setSuccess = (message) => {
  return setNotification(message, 'success')
}

const setInfo = (message) => {
  return setNotification(message, 'info')
}

export default { setError, setSuccess, setInfo, clearNotifications }
