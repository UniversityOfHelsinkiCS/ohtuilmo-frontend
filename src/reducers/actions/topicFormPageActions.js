const updateTitle = (title) => {
  return {
    type: 'UPDATE_TITLE_SUBMIT',
    payload: title
  }
}

const updateCustomerName = (customerName) => {
  return {
    type: 'UPDATE_CUSTOMER_NAME_SUBMIT',
    payload: customerName
  }
}

const updateEmail = (email) => {
  return {
    type: 'UPDATE_EMAIL_SUBMIT',
    payload: email
  }
}

const updateDescription = (description) => {
  return {
    type: 'UPDATE_DESCRIPTION_SUBMIT',
    payload: description
  }
}

const updateEnvironment = (environment) => {
  return {
    type: 'UPDATE_ENVIRONMENT_SUBMIT',
    payload: environment
  }
}

const updateSpecialRequests = (specialRequests) => {
  return {
    type: 'UPDATE_SPECIAL_REQUESTS_SUBMIT',
    payload: specialRequests
  }
}

const updateAdditionalInfo = (additionalInfo) => {
  return {
    type: 'UPDATE_ADDITIONAL_INFO_SUBMIT',
    payload: additionalInfo
  }
}

const clearForm = () => {
  return {
    type: 'CLEAR_FORM_SUBMIT'
  }
}

const setSaved = (status) => {
  return {
    type: 'SET_SAVED_SUBMIT',
    payload: status
  }
}

const updateSecretId = (secretId) => {
  return {
    type: 'UPDATE_SECRETID_SUBMIT',
    payload: secretId
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
  setSaved,
  updateSecretId
}
