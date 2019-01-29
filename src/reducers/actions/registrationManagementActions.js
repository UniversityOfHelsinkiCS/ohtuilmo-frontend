const setRegistrationManagement = (registrationManagement) => {
  return {
    type: 'SET_REGISTRATION_MANAGEMENT',
    payload: {
      projectRegistrationOpen: registrationManagement.project_registration_open,
      projectRegistrationMessage:
        registrationManagement.project_registration_message,
      topicRegistrationOpen: registrationManagement.topic_registration_open,
      topicRegistrationMessage:
        registrationManagement.topic_registration_message
    }
  }
}

const updateProjectRegistrationOpen = (projectRegistrationOpen) => {
  return {
    type: 'UPDATE_PROJECT_REGISTRATION_OPEN',
    payload: projectRegistrationOpen
  }
}

const updateProjectRegistrationMessage = (projectRegistrationMessage) => {
  return {
    type: 'UPDATE_PROJECT_REGISTRATION_MESSAGE',
    payload: projectRegistrationMessage
  }
}

const updateTopicRegistrationOpen = (topicRegistrationOpen) => {
  return {
    type: 'UPDATE_TOPIC_REGISTRATION_OPEN',
    payload: topicRegistrationOpen
  }
}

const updateTopicRegistrationMessage = (topicRegistrationMessage) => {
  return {
    type: 'UPDATE_TOPIC_REGISTRATION_MESSAGE',
    payload: topicRegistrationMessage
  }
}


export default {
  setRegistrationManagement,
  updateProjectRegistrationOpen,
  updateProjectRegistrationMessage,
  updateTopicRegistrationOpen,
  updateTopicRegistrationMessage
}

