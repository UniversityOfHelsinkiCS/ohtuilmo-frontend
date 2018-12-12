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

export default { setConfigurations, updateSelected }