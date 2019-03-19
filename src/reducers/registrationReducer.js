const registrationReducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_REGISTRATION':
    return {
      ...action.payload
    }
  case 'CLEAR_REGISTRATION':
    return null
  default:
    return state
  }
}

export default registrationReducer
