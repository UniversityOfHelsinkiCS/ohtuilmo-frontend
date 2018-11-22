const updateTitle = (title) => {
  return {
    type: 'UPDATE_TITLE_EDIT',
    payload: title
  }
}

const updateCustomerName = (customerName) => {
  return {
    type: 'UPDATE_CUSTOMER_NAME_EDIT',
    payload: customerName
  }
}

const updateEmail = (email) => {
  return {
    type: 'UPDATE_EMAIL_EDIT',
    payload: email
  }
}

const updateDescription = (description) => {
  return {
    type: 'UPDATE_DESCRIPTION_EDIT',
    payload: description
  }
}

const updateEnvironment = (environment) => {
  return {
    type: 'UPDATE_ENVIRONMENT_EDIT',
    payload: environment
  }
}

const updateSpecialRequests = (specialRequests) => {
  return {
    type: 'UPDATE_SPECIAL_REQUESTS_EDIT',
    payload: specialRequests
  }
}

const updateAdditionalInfo = (additionalInfo) => {
  return {
    type: 'UPDATE_ADDITIONAL_INFO_EDIT',
    payload: additionalInfo
  }
}

const clearForm = () => {
  return {
    type: 'CLEAR_FORM_EDIT'
  }
}

const setCurrentTopic = (topic) => {
  return {
    type: 'SET_TOPIC_EDIT',
    payload: topic
  }
}

export default {
  updateTitle,
  updateCustomerName,
  updateEmail,
  updateDescription,
  updateEnvironment,
  updateSpecialRequests,
  updateAdditionalInfo,
  clearForm,
  setCurrentTopic
}
