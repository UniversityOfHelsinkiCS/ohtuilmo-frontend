const initialState = {
  title: '',
  customerName: '',
  email: '',
  description: '',
  environment: '',
  specialRequests: '',
  additionalInfo: '',
  isSaved: false,
  secretId: '',
  preview: false
}

const topicFormReducer = (name = '') => {
  return (state = initialState, action) => {
    switch (action.type) {
    case `UPDATE_TITLE_${name}`:
      return {
        ...state,
        title: action.payload
      }
    case `UPDATE_CUSTOMER_NAME_${name}`:
      return {
        ...state,
        customerName: action.payload
      }
    case `UPDATE_EMAIL_${name}`:
      return {
        ...state,
        email: action.payload
      }
    case `UPDATE_DESCRIPTION_${name}`:
      return {
        ...state,
        description: action.payload
      }
    case `UPDATE_ENVIRONMENT_${name}`:
      return {
        ...state,
        environment: action.payload
      }
    case `UPDATE_SPECIAL_REQUESTS_${name}`:
      return {
        ...state,
        specialRequests: action.payload
      }
    case `UPDATE_ADDITIONAL_INFO_${name}`:
      return {
        ...state,
        additionalInfo: action.payload
      }
    case `CLEAR_FORM_${name}`:
      return {
        ...state,
        title: '',
        customerName: '',
        email: '',
        description: '',
        environment: '',
        specialRequests: '',
        additionalInfo: ''
      }
    case `SET_TOPIC_${name}`:
      return {
        title: action.payload.title,
        customerName: action.payload.customerName,
        email: action.payload.email,
        description: action.payload.description,
        environment: action.payload.environment,
        specialRequests: action.payload.specialRequests,
        additionalInfo: action.payload.additionalInfo
      }
    case `SET_SAVED_${name}`:
      return {
        ...state,
        isSaved: action.payload
      }
    case `UPDATE_SECRETID_${name}`:
      return {
        ...state,
        secretId: action.payload
      }
    case `UPDATE_PREVIEW_${name}`:
      return {
        ...state,
        preview: action.payload
      }
    default:
    }
    return state
  }
}

export default topicFormReducer
