const updateUsername = (username) => {
  return {
    type: 'UPDATE_USERNAME',
    payload: username
  }
}

const updatePassword = (password) => {
  return {
    type: 'UPDATE_PASSWORD',
    payload: password
  }
}

const updateUser = (user) => {
  return {
    type: 'UPDATE_LOGGED_IN',
    payload: user
  }
}

const clearForm = () => {
  return {
    type: 'CLEAR_FORM'
  }
}

export default { updateUsername, updatePassword, updateUser, clearForm }
