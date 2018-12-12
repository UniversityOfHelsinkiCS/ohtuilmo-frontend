const setConfigurations = (configurations) => {
  return {
    type: 'SET_CONFIGURATIONS',
    payload: configurations
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
  console.log('asd')
  return {
    type: 'UPDATE_NEW_STATUS',
    payload: status
  }
}

export default {
  setConfigurations,
  updateSelected,
  selectNewConfig,
  updateConfigForm,
  updateConfigName,
  updateNewStatus
}
