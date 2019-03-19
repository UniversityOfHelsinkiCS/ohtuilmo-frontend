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

Cypress.Commands.add('createGroup', (groupData) => {
  withLoggedAdminToken((token) => {
    const authHeaders = {
      Authorization: 'Bearer ' + token
    }
    console.log('GROUP I CREATED', groupData)
    const {
      name,
      topicId,
      configurationId,
      instructorId,
      studentIds
    } = groupData

    cy.request({
      url: '/api/groups',
      method: 'POST',
      headers: authHeaders,
      body: {
        name,
        topicId,
        configurationId,
        instructorId,
        studentIds
      }
    })
  })
})

Cypress.Commands.add('deleteAllGroups', () => {
  withLoggedAdminToken((token) => {
    const authHeaders = {
      Authorization: 'Bearer ' + token
    }
    cy.request({
      url: '/api/groups',
      method: 'GET',
      headers: authHeaders
    }).then((res) => {
      const allGroups = res.body
      //if(allGroup ==! undefined) {
      for (const group of allGroups) {
        cy.request({
          url: `/api/groups/${group.id}`,
          method: 'DELETE',
          headers: authHeaders
        })
      }
    })
  })
})

Cypress.Commands.add(
  'setPeerReviewOneActive',
  (configurationName, configurationId, questionSetName) => {
    withLoggedAdminToken((token) => {
      const authHeaders = {
        Authorization: 'Bearer ' + token
      }
      findReviewQuestionId(authHeaders, questionSetName).then((setId) => {
        cy.request({
          url: `api/configurations/${configurationId}`,
          method: 'PUT',
          headers: authHeaders,
          body: {
            name: configurationName,
            review_question_set_1_id: setId
          }
        })
      })
    })
  }
)

const findReviewQuestionId = (authHeaders, questionSetName) => {
  return cy
    .request({
      url: '/api/reviewQuestions',
      method: 'GET',
      headers: authHeaders
    })
    .then((res) => {
      const { questionSets } = res.body

      for (const set of questionSets) {
        if (set.name === questionSetName) {
          return set.id
        }
      }
    })
}
