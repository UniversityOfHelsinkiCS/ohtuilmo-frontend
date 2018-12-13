const initialState = {
  configurations: [],
  selected: null,
  form: {
    name: ''
  },
  isNew: false
}

const adminPageReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_CONFIGURATIONS':
    return {
      ...state,
      configurations: action.payload
    }
  case 'UPDATE_CONFIGURATIONS':
    return {
      ...state,
      configurations: state.configurations.map(
        (config) => config.id === action.payload.id ? action.payload : config
      )
    }
  case 'UPDATE_SELECTED':
    return {
      ...state,
      selected: action.payload
    }
  case 'SELECT_NEW_CONFIG':
    return {
      ...state,
      selected: null,
      form: {
        name: ''
      }
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
  case 'UPDATE_NEW_STATUS':
    return {
      ...state,
      isNew: action.payload
    }
  default:
  }
  return state
}

export default adminPageReducer
