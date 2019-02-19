const { TEST_USER } = require('../common')

const loginAsUser = () => {
  cy.get('.loginpage-form input[name="username"]').type(TEST_USER.username)
  cy.get('.loginpage-form input[name="password"]').type(TEST_USER.password)
  cy.get('.loginpage-form .loginpage-button').click()
}

const assertIsOnLandingPage = () => {
  cy.get('[data-cy=registrationlink]').should('be.visible')
}

const assertIsOnLoginPage = () => {
  cy.url().should('include', '/login')
  cy.contains('Software engineering project')
  cy.get('.loginpage-header').should('have.text', 'Login')
}

describe('Auto redirects for user without authentication', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
  })

  it('/administration redirects user to login page', () => {
    cy.visit('/administration')
    assertIsOnLoginPage()
  })

  it('/administration/participants redirects user to login page', () => {
    cy.visit('/administration/participants')
    assertIsOnLoginPage()
  })

  it('/administration/questions redirects user to login page', () => {
    cy.visit('/administration/questions')
    assertIsOnLoginPage()
  })

  it('/administration/registrationmanagement redirects user to login page', () => {
    cy.visit('/administration/registrationmanagement')
    assertIsOnLoginPage()
  })

  it('/registrationdetails redirects user to login page', () => {
    cy.visit('/registrationdetails')
    assertIsOnLoginPage()
  })

  it('/register redirects user to login page', () => {
    cy.visit('/register')
    assertIsOnLoginPage()
  })

  it('/topics redirects user to login page', () => {
    cy.visit('/topics')
    assertIsOnLoginPage()
  })
})

describe('Auto redirects for user with authentication', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
    loginAsUser()
    assertIsOnLandingPage()
  })

  it('/administration redirects user to landing page', () => {
    cy.visit('/administration')
    assertIsOnLandingPage()
  })

  it('/administration/participants redirects user to landing page', () => {
    cy.visit('/administration/participants')
    assertIsOnLandingPage()
  })

  it('/administration/questions redirects user to landing page', () => {
    cy.visit('/administration/questions')
    assertIsOnLandingPage()
  })

  it('/administration/registrationmanagement redirects user to landing page', () => {
    cy.visit('/administration/registrationmanagement')
    assertIsOnLandingPage()
  })

  it('/topics redirects user to landing page', () => {
    cy.visit('/topics')
    assertIsOnLandingPage()
  })
})
