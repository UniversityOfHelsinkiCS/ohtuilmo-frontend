const updateTitle = (title) => {
  return {
    type: 'UPDATE_TITLE',
    data: title
  }
}

const updateCustomerName = (customerName) => {
  return {
    type: 'UPDATE_CUSTOMER_NAME',
    data: customerName
  }
}

const updateEmail = (email) => {
  return {
    type: 'UPDATE_EMAIL',
    data: email
  }
}

const updateDescription = (description) => {
  return {
    type: 'UPDATE_DESCRIPTION',
    data: description
  }
}

const updateEnvironment = (environment) => {
  return {
    type: 'UPDATE_ENVIRONMENT',
    data: environment
  }
}

const updateSpecialRequests = (specialRequests) => {
  return {
    type: 'UPDATE_SPECIAL_REQUESTS',
    data: specialRequests
  }
}

const updateAdditionalInfo = (additionalInfo) => {
  return {
    type: 'UPDATE_ADDITIONAL_INFO',
    data: additionalInfo
  }
}

const clearForm = () => {
  return {
    type: 'CLEAR_FORM'
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
  clearForm
}
