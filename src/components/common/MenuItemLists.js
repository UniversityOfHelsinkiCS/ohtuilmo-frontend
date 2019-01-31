const regularItems = (history) => {
  const items = [
    {
      text: 'Log In',
      handler: () => history.push('/login')
    }
  ]

  return items
}

const loggedInItems = (history) => {
  const items = [
    {
      text: 'Home',
      handler: () => history.push('/')
    }
  ]

  return items
}

const adminItems = (history) => {
  const items = [
    {
      text: 'Create Topic',
      handler: () => history.push('/topics/create')
    },
    {
      text: 'Topics',
      handler: () => history.push('/topics')
    },
    {
      text: 'Administration',
      handler: () => history.push('/administration')
    },
    {
      text: 'Registration Management',
      handler: () => history.push('/administration/registrationmanagement')
    }
  ]

  return items
}

export { regularItems, loggedInItems, adminItems }
