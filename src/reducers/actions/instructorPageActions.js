const setConfigurations = (configurations) => {
  return {
    type: 'SET_CONFIGURATIONS',
    payload: configurations
  }
}

const setCurrentConfiguration = (configurationNumber) => {
  return {
    type: 'SET_CURRENT_CONFIGURATION',
    payload: configurationNumber
  }
}

export default { setCurrentConfiguration, setConfigurations }
