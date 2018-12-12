const initialState = {
  configurations: [],
  selected: {},
  form: {
    name: ''
  }
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
  case 'UPDATE_CONFIG_FORM':
    return {
      ...state,
      form: {
        name: action.payload.name
      }
    }
  case 'UPDATE_CONFIG_NAME':
    return {
      ...state,
      form: {
        ...state.form,
        name: action.payload
      }
    }
  default:
  }
  return state
}

export default adminPageReducer
