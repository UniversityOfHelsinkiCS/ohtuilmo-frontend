const initialState = {
  configurations: [],
  selected: {}
}

const adminPageReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_CONFIGURATIONS':
    return {
      ...state,
      configurations: action.payload
    }
  case 'UPDATE_SELECTED':
    return {
      ...state,
      selected: action.payload
    }
  default:
  }
  return state
}

export default adminPageReducer
