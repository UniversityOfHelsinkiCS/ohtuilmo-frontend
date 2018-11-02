const initialState = {
  type: '',
  message: '',
  open: false
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_ERROR':
    return {
      ...state,
      type: 'error',
      message: action.payload,
      open: true
    }
  case 'SET_SUCCESS':
    return {
      ...state,
      type: 'success',
      message: action.payload,
      open: true
    }
  case 'SET_INFO':
    return {
      ...state,
      type: 'info',
      message: action.payload,
      open: true
    }
  case 'CLEAR_NOTIFICATIONS':
    return {
      type: '',
      message: '',
      open: false
    }
  default:
  }
  return state
}

export default notificationReducer
