const initialState = {
  projectRegistrationOpen: true,
  projectRegistrationMessage: '',
  topicRegistrationOpen: true,
  topicRegistrationMessage: ''
}

const registrationManagementReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_REGISTRATION_MANAGEMENT':
    return {
      ...state,
      projectRegistrationOpen: action.payload.projectRegistrationOpen,
      projectRegistrationMessage: action.payload.projectRegistrationMessage,
      topicRegistrationOpen: action.payload.topicRegistrationOpen,
      topicRegistrationMessage: action.payload.topicRegistrationMessage
    }
  case 'UPDATE_PROJECT_REGISTRATION_OPEN':
    return {
      ...state,
      projectRegistrationOpen: action.payload.projectRegistrationOpen
    }
  case 'UPDATE_PROJECT_REGISTRATION_MESSAGE':
    return {
      ...state,
      projectRegistrationMessage: action.payload.projectRegistrationMessage
    }
  case 'UPDATE_TOPIC_REGISTRATION_OPEN':
    return {
      ...state,
      topicRegistrationOpen: action.payload.topicRegistrationOpen
    }
  case 'UPDATE_TOPIC_REGISTRATION_MESSAGE':
    return {
      ...state,
      topicRegistrationMessage: action.payload.topicRegistrationMessage
    }
  default:
    return state
  }
}

export default registrationManagementReducer
