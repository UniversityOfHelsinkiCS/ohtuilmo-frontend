const initialState = {
  myGroup: null
}

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_REGISTRATION':
    return {
      ...action.payload
    }
  case 'CLEAR_REGISTRATION':
    return null

  case 'INITIALIZE_MYGROUP':
    return {
      ...state,
      myGroup: action.payload
    }
  default:
    return state
  }
}

export default registrationReducer
