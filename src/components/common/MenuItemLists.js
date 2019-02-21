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
      className: 'create-topic-menu-item',
      text: 'Create Topic',
      handler: () => history.push('/topics/create')
    },
    {
      className: 'topics-menu-item',
      text: 'Topics',
      handler: () => history.push('/topics')
    },
    {
      className: 'administration-menu-item',
      text: 'Administration',
      handler: () => history.push('/administration')
    },
    {
      className: 'registration-management-menu-item',
      text: 'Registration Management',
      handler: () => history.push('/administration/registrationmanagement')
    },
    {
      text: 'Group Management',
      handler: () => history.push('/administration/groups')
    }
  ]

  return items
}

export { regularItems, loggedInItems, adminItems }
