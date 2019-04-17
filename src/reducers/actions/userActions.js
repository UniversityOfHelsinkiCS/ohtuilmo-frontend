import tokenCheckService from '../../services/tokenCheck'
import userService from '../../services/user'

export const loginUser = (user) => {
  return async (dispatch) => {
    try {
      const { isInstructor } = await userService.checkInstructor(user.token)
      user.user.instructor = isInstructor

      dispatch({ type: 'LOGIN_USER', payload: user })
    } catch (error) {
      console.log('ERROR', error)
    }
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER'
  }
}

export const loginToken = () => {
  return async (dispatch) => {
    try {
      const user = JSON.parse(window.localStorage.getItem('loggedInUser'))
      const response = await tokenCheckService.userCheck(user.token)

      if (response.message === 'success') {
        const { isInstructor } = await userService.checkInstructor(user.token)
        user.user.instructor = isInstructor

        dispatch({ type: 'LOGIN_TOKEN', payload: user })
      }
    } catch (error) {
      // ??
      dispatch({ type: 'LOGOUT_USER' })
    }
  }
}
