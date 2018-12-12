const initialState = {
  configurations: {}
}

const adminPageReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_CONFIGURATIONS':
    return {
      ...state,
      configurations: action.payload
    }
  default:
  }
  return state
}

export default adminPageReducer
