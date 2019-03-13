// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import { TEST_USER, TEST_USER2, TEST_ADMIN } from '../common'

const postLogin = (user) => {
  const { username, password } = user
  return cy.request({
    url: '/api/login',
    method: 'POST',
    body: {
      username,
      password
    }
  })
}

const loginAsUser = (user) => {
  postLogin(user).then((res) => {
    const userData = res.body
    window.localStorage.setItem('loggedInUser', JSON.stringify(userData))
  })
}

Cypress.Commands.add('loginAsUnregisteredUser', () => {
  loginAsUser(TEST_USER)
})

Cypress.Commands.add('loginAsRegisteredUser', () => {
  loginAsUser(TEST_USER2)
})

Cypress.Commands.add('loginAsAdmin', () => {
  loginAsUser(TEST_ADMIN)
})

const withLoggedAdminToken = (fn) => {
  postLogin(TEST_ADMIN).then((res) => {
    const { token } = res.body
    fn(token)
  })
}

Cypress.Commands.add('deleteRegistrationQuestions', () => {
  withLoggedAdminToken((token) => {
    const authHeaders = {
      Authorization: 'Bearer ' + token
    }

    cy.request({
      url: '/api/registrationQuestions',
      method: 'GET',
      headers: authHeaders
    }).then((res) => {
      const { questionSets } = res.body

      for (const set of questionSets) {
        cy.request({
          url: `/api/registrationQuestions/${set.id}`,
          method: 'DELETE',
          headers: authHeaders
        })
      }
    })
  })
})

Cypress.Commands.add('createRegistrationQuestionSet', (name, questions) => {
  withLoggedAdminToken((token) => {
    const authHeaders = {
      Authorization: 'Bearer ' + token
    }

    cy.request({
      url: '/api/registrationQuestions',
      method: 'POST',
      headers: authHeaders,
      body: {
        name,
        questions
      }
    })
  })
})

Cypress.Commands.add('deleteReviewQuestions', () => {
  withLoggedAdminToken((token) => {
    const authHeaders = {
      Authorization: 'Bearer ' + token
    }

    cy.request({
      url: '/api/reviewQuestions',
      method: 'GET',
      headers: authHeaders
    }).then((res) => {
      const { questionSets } = res.body

      for (const set of questionSets) {
        cy.request({
          url: `/api/reviewQuestions/${set.id}`,
          method: 'DELETE',
          headers: authHeaders
        })
      }
    })
  })
})

Cypress.Commands.add('createReviewQuestionSet', (name, questions) => {
  withLoggedAdminToken((token) => {
    const authHeaders = {
      Authorization: 'Bearer ' + token
    }

    cy.request({
      url: '/api/reviewQuestions',
      method: 'POST',
      headers: authHeaders,
      body: {
        name,
        questions
      }
    })
  })
})
