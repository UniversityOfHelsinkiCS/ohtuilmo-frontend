const { TEST_USER, TEST_ADMIN } = require('../common')

const loginAsUser = () => {
  cy.get('.loginpage-form input[name="username"]').type(TEST_USER.username)
  cy.get('.loginpage-form input[name="password"]').type(TEST_USER.password)
  cy.get('.loginpage-form .loginpage-button').click()
}

const loginAsAdmin = () => {
  cy.get('.loginpage-form input[name="username"]').type(TEST_ADMIN.username)
  cy.get('.loginpage-form input[name="password"]').type(TEST_ADMIN.password)
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

describe('Page access without authentication', () => {
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

describe('Page access for user', () => {
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

describe.only('Page access for admin', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
    loginAsAdmin()
    assertIsOnLandingPage()
  })

  it('renders /administration when visited', () => {
    cy.get('.nav-menu-button').click()
    cy.get('.administration-menu-item').click()
    cy.url().should('contain', '/administration')
    cy.contains('Change configuration')
  })

  it('renders /administration/participants when visited', () => {
    cy.visit('/administration/participants')
    cy.url().should('contain', '/administration/participants')
    cy.get('.participants-container').should('be.visible')
  })

  it('renders /administration/questions when visited', () => {
    cy.visit('/administration/questions')
    cy.url().should('contain', '/administration/questions')
    cy.get('.questions-form-container').should('be.visible')
  })

  it('renders /administration/registrationmanagement when visited', () => {
    cy.get('.nav-menu-button').click()
    cy.get('.registration-management-menu-item').click()
    cy.url().should('contain', '/administration/registrationmanagement')
    cy.contains('Registration management')
  })

  it('renders /topics when visited', () => {
    cy.get('.nav-menu-button').click()
    cy.get('.topics-menu-item').click()
    cy.url().should('contain', '/topics')
    cy.get('.topics-container').should('be.visible')
  })
})
