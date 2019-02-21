const { TEST_USER } = require('../common')

const writeCredentials = (username, password) => {
  cy.get('.loginpage-form input[name="username"]').type(username)
  cy.get('.loginpage-form input[name="password"]').type(password)
}

const clickLogin = () => {
  cy.get('.loginpage-form .loginpage-button').click()
}

const assertIsOnLoginPage = () => {
  cy.url().should('include', '/login')
  cy.contains('Software engineering project')
  cy.get('.loginpage-header').should('have.text', 'Login')
}

describe('Login page', () => {
  it('redirects to the login page when not logged in', () => {
    cy.clearLocalStorage()

    cy.visit('/')

    assertIsOnLoginPage()
  })

  it('renders the login page when going directly to /login', () => {
    cy.visit('/login')

    assertIsOnLoginPage()
  })

  it('keeps user on the /login page if login fails with invalid credentials', () => {
    cy.visit('/')
    writeCredentials('asdasdasd', 'adsasfasd')
    clickLogin()

    cy.url().should('include', '/login')
  })

  it('shows an error if credentials are incorrect', () => {
    cy.visit('/')
    writeCredentials('asdasdasd', 'adsasfasd')
    clickLogin()

    cy.get('.notification').should(
      'have.text',
      'Username or password is incorrect!'
    )
  })

  it('shows an error if credentials are empty', () => {
    cy.visit('/')
    clickLogin()

    cy.get('.notification').should(
      'have.text',
      'Username or password is missing!'
    )
  })

  it('shows username and logout button in navbar after successful login', () => {
    cy.visit('/')
    writeCredentials(TEST_USER.username, TEST_USER.password)
    clickLogin()

    cy.get('.navigation-bar-username').should('have.text', TEST_USER.username)
    cy.get('.navigation-bar-logout-button').should('have.text', 'Log out')
  })

  it('redirects user back to login page after logout', () => {
    cy.visit('/')
    writeCredentials(TEST_USER.username, TEST_USER.password)
    clickLogin()
    cy.get('.navigation-bar-logout-button').click()

    assertIsOnLoginPage()
  })
})
