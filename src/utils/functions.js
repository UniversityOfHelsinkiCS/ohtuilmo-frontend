export const getUserToken = () => {
  const loggedInUser = localStorage.getItem('loggedInUser')
  let token
  if (loggedInUser) {
    token = JSON.parse(loggedInUser).token
  }
  return token
}

export const getUser = () => {
  const loggedInUser = localStorage.getItem('loggedInUser')
  let user
  if (loggedInUser) {
    user = JSON.parse(loggedInUser).user
  }
  return user
}
