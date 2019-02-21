const { TEST_USER, TEST_USER2, TEST_ADMIN } = require('../common')

const loginAsUser = (user) => {
  cy.get('.loginpage-form input[name="username"]').type(user.username)
  cy.get('.loginpage-form input[name="password"]').type(user.password)
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

const assertIsOnRegistrationDetailsPage = () => {
  cy.url().should('include', '/registrationdetails')
  cy.contains('Registration details')
  cy.get('.registration-details-container').should('be.visible')
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
    loginAsUser(TEST_USER)
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

  it('renders /register when visited', () => {
    cy.get('[data-cy=registrationlink]').click()
    cy.url().should('contain', '/register')
    cy.get('.registration-form').should('be.visible')
  })
})

describe('Page access for registered user', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
    loginAsUser(TEST_USER2)
    // login redirects to registration details page
    assertIsOnRegistrationDetailsPage()
  })

  it('/register redirects to /registrationdetails', () => {
    cy.visit('/register')
    assertIsOnRegistrationDetailsPage()
  })
})

describe('Page access for admin', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
    loginAsUser(TEST_ADMIN)
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
