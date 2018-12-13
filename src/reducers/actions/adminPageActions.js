const setConfigurations = (configurations) => {
  return {
    type: 'SET_CONFIGURATIONS',
    payload: configurations
  }
}

const updateConfigurations = (configuration) => {
  return {
    type: 'UPDATE_CONFIGURATIONS',
    payload: configuration
  }
}

const updateSelected = (configuration) => {
  return {
    type: 'UPDATE_SELECTED',
    payload: configuration
  }
}

const selectNewConfig = () => {
  return {
    type: 'SELECT_NEW_CONFIG'
  }
}

const updateConfigForm = (configuration) => {
  return {
    type: 'UPDATE_CONFIG_FORM',
    payload: configuration
  }
}

const updateConfigName = (name) => {
  return {
    type: 'UPDATE_CONFIG_NAME',
    payload: name
  }
}

const updateNewStatus = (status) => {
  return {
    type: 'UPDATE_NEW_STATUS',
    payload: status
  }
}

export default {
  setConfigurations,
  updateConfigurations,
  updateSelected,
  selectNewConfig,
  updateConfigForm,
  updateConfigName,
  updateNewStatus
}
