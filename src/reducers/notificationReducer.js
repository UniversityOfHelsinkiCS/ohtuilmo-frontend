const initialState = {
  error: '',
  open: false
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_ERROR':
    return {
      ...state,
      error: action.payload,
      open: true
    }
  case 'CLEAR_NOTIFICATIONS':
    return {
      error: '',
      open: false
    }
  default:
  }
  return state
}

export default notificationReducer