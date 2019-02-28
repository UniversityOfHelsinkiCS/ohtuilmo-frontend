const initialState = {
  peerReviewOpen: false,
  peerReviewRound: 1,
  projectRegistrationOpen: false,
  projectRegistrationMessage: 'Registration is closed.',
  projectRegistrationInfo: '',
  topicRegistrationOpen: false,
  topicRegistrationMessage: 'Registration is closed.'
}

const registrationManagementReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_REGISTRATION_MANAGEMENT':
    return {
      ...state,
      peerReviewOpen: action.payload.peerReviewOpen,
      peerReviewRound: action.payload.peerReviewRound,
      projectRegistrationOpen: action.payload.projectRegistrationOpen,
      projectRegistrationMessage: action.payload.projectRegistrationMessage,
      projectRegistrationInfo: action.payload.projectRegistrationInfo,
      topicRegistrationOpen: action.payload.topicRegistrationOpen,
      topicRegistrationMessage: action.payload.topicRegistrationMessage
    }
  case 'UPDATE_PEER_REVIEW_OPEN':
    return {
      ...state,
      peerReviewOpen: action.payload
    }
  case 'UPDATE_PEER_REVIEW_ROUND':
    return {
      ...state,
      peerReviewRound: action.payload
    }
  case 'UPDATE_PROJECT_REGISTRATION_OPEN':
    return {
      ...state,
      projectRegistrationOpen: action.payload
    }
  case 'UPDATE_PROJECT_REGISTRATION_MESSAGE':
    return {
      ...state,
      projectRegistrationMessage: action.payload
    }
  case 'UPDATE_PROJECT_REGISTRATION_INFO':
    return {
      ...state,
      projectRegistrationInfo: action.payload
    }
  case 'UPDATE_TOPIC_REGISTRATION_OPEN':
    return {
      ...state,
      topicRegistrationOpen: action.payload
    }
  case 'UPDATE_TOPIC_REGISTRATION_MESSAGE':
    return {
      ...state,
      topicRegistrationMessage: action.payload
    }
  default:
    return state
  }
}

export default registrationManagementReducer
