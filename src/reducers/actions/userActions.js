import loginService from '../../services/login'
import userService from '../../services/user'

const updateIsInstructor = (user, isInstructor) => ({
  ...user,
  instructor: isInstructor
})

export const loginUser = (userCredentials) => {
  return async (dispatch) => {
    const { user, token } = await loginService.login(userCredentials)

    const { isInstructor } = await userService.checkInstructor(token)

    dispatch({
      type: 'LOGIN_USER',
      payload: {
        token,
        user: updateIsInstructor(user, isInstructor)
      }
    })
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT_USER'
  }
}
