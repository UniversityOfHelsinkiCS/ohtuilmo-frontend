const regularItems = history => {
  const items = [
    {
      text: 'Create Topic',
      handler: () => history.push(process.env.PUBLIC_URL + '/topics/create')
    },
    {
      text: 'Log In',
      handler: () => history.push(process.env.PUBLIC_URL + '/login')
    }
  ]

  return items
}

const loggedInItems = history => {
  const items = [
    {
      text: 'Home',
      handler: () => history.push(process.env.PUBLIC_URL + '/')
    }
  ]

  return items
}

const adminItems = history => {
  const items = [
    {
      text: 'Topics',
      handler: () => history.push(process.env.PUBLIC_URL + '/topics')
    },
    {
      text: 'Administration',
      handler: () => history.push(process.env.PUBLIC_URL + '/administration')
    }
  ]

  return items
}

export { regularItems, loggedInItems, adminItems }
