import registrationService from '../../services/registration'

const clearRegistration = () => {
  return {
    type: 'CLEAR_REGISTRATION'
  }
}

const fetchRegistration = () => {
  return async (dispatch) => {
    const registration = await registrationService.getOwn()
    if (registration) {
      dispatch({
        type: 'SET_REGISTRATION',
        payload: registration
      })
    } else {
      dispatch({
        type: 'CLEAR_REGISTRATION'
      })
    }
  }
}

export default { clearRegistration, fetchRegistration }
