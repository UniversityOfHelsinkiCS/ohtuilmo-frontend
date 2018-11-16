const initialState = {
  username: '',
  password: '',
  user: null
}

const loginPageReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_USERNAME':
    return {
      ...state,
      username: action.payload
    }
  case 'UPDATE_PASSWORD':
    return {
      ...state,
      password: action.payload
    }
  case 'UPDATE_LOGGED_IN':
    return {
      ...state,
      user: action.payload
    }
  case 'CLEAR_FORM':
    return {
      ...state,
      username: '',
      password: ''
    }
  default:
  }
  return state
}

export default loginPageReducer
