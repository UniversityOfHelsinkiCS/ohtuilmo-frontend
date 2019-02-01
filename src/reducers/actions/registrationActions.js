const setRegistration = (registration) => {
  return {
    type: 'SET_REGISTRATION',
    payload: registration
  }
}

const clearRegistration = () => {
  return {
    type: 'CLEAR_REGISTRATION'
  }
}

export default { setRegistration, clearRegistration }
