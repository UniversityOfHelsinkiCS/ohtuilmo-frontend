const initialState = {
  type: '',
  message: '',
  open: false
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION': {
    const { type, message } = action.payload
    return {
      ...state,
      open: true,
      type,
      message
    }
  }
  case 'CLEAR_NOTIFICATIONS':
    return {
      type: '',
      message: '',
      open: false
    }
  default:
    return state
  }
}

export default notificationReducer
