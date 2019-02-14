import registrationManagementService from '../../services/registrationManagement'

const fetchRegistrationManagement = () => {
  return async (dispatch) => {
    const response = await registrationManagementService.get()
    const {
      project_registration_open,
      project_registration_message,
      project_registration_info,
      topic_registration_open,
      topic_registration_message
    } = response.registrationManagement

    dispatch({
      type: 'SET_REGISTRATION_MANAGEMENT',
      payload: {
        projectRegistrationOpen: project_registration_open,
        projectRegistrationMessage: project_registration_message,
        projectRegistrationInfo: project_registration_info,
        topicRegistrationOpen: topic_registration_open,
        topicRegistrationMessage: topic_registration_message
      }
    })
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

const updateProjectRegistrationInfo = (projectRegistrationInfo) => {
  return {
    type: 'UPDATE_PROJECT_REGISTRATION_INFO',
    payload: projectRegistrationInfo
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
  fetchRegistrationManagement,
  updateProjectRegistrationOpen,
  updateProjectRegistrationMessage,
  updateProjectRegistrationInfo,
  updateTopicRegistrationOpen,
  updateTopicRegistrationMessage
}
