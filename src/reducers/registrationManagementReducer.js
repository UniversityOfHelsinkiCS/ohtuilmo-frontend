const initialState = {
  project_registration_open: true,
  project_registration_message: '',
  topic_registration_open: true,
  topic_registration_message: ''
}

const registrationManagementReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_REGISTRATION_MANAGEMENT':
    return {
      ...state,
      project_registration_open: action.payload.project_registration_open,
      project_registration_message:
          action.payload.project_registration_message,
      topic_registration_open: action.payload.topic_registration_open,
      topic_registration_message: action.payload.topic_registration_message
    }
  default:
    return state
  }
}

export default registrationManagementReducer
