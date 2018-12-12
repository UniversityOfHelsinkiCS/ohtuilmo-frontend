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

export default {
  setConfigurations,
  updateSelected,
  updateConfigForm,
  updateConfigName
}
