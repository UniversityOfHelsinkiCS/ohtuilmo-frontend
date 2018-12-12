const setConfigurations = (configurations) => {
  return {
    type: 'SET_CONFIGURATIONS',
    payload: configurations
  }
}

export default { setConfigurations }