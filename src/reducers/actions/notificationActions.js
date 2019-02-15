const clearNotifications = () => {
  return {
    type: 'CLEAR_NOTIFICATIONS'
  }
}

let clearNotificationTimeoutHandle = null

const isPreviousNotificationShowing = () =>
  clearNotificationTimeoutHandle !== null

const cancelClearTimeout = () => {
  clearTimeout(clearNotificationTimeoutHandle)
  clearNotificationTimeoutHandle = null
}
const clearNotificationsAfter = (timeout, dispatch) => {
  clearNotificationTimeoutHandle = setTimeout(() => {
    dispatch(clearNotifications())
  }, timeout)
}

const setNotification = (message, type, timeout) => {
  return (dispatch) => {
    if (isPreviousNotificationShowing()) {
      // Cancel the previous setTimeout so we can start a new one
      cancelClearTimeout()
    }

    dispatch({
      type: 'SET_NOTIFICATION',
      payload: { message, type }
    })

    clearNotificationsAfter(timeout, dispatch)
  }
}

export const setError = (message, timeout = 3000) => {
  return setNotification(message, 'error', timeout)
}

export const setSuccess = (message, timeout = 3000) => {
  return setNotification(message, 'success', timeout)
}

export const setInfo = (message, timeout = 3000) => {
  return setNotification(message, 'info', timeout)
}

export default { setError, setSuccess, setInfo }
