const initialState = {
  title: '',
  customerName: '',
  email: '',
  description: '',
  environment: '',
  specialRequests: '',
  additionalInfo: ''
}

const topicFormPageReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_TITLE':
    return {
      ...state,
      title: action.data
    }
  case 'UPDATE_CUSTOMER_NAME':
    return {
      ...state,
      customerName: action.data
    }
  case 'UPDATE_EMAIL':
    return {
      ...state,
      email: action.data
    }
  case 'UPDATE_DESCRIPTION':
    return {
      ...state,
      description: action.data
    }
  case 'UPDATE_ENVIRONMENT':
    return {
      ...state,
      environment: action.data
    }
  case 'UPDATE_SPECIAL_REQUESTS':
    return {
      ...state,
      specialRequests: action.data
    }
  case 'UPDATE_ADDITIONAL_INFO':
    return {
      ...state,
      additionalInfo: action.data
    }
  default:
  }
  return state
}

export default topicFormPageReducer
