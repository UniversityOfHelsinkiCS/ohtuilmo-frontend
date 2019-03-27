const initialState = {
  configurations: [],
  currentConfiguration: ''
}
const instructorPageReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_CONFIGURATIONS':
    return {
      ...state,
      configurations: action.payload
    }
  case 'SET_CURRENT_CONFIGURATION':
    return {
      ...state,
      currentConfiguration: action.payload
    }
  default:
    return state
  }
}

export default instructorPageReducer
