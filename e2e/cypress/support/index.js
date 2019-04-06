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
  'createNewTopic',
  (newTopicName, customerName, topicDescription) => {
    withLoggedAdminToken((token) => {
      const authHeaders = {
        Authorization: 'Bearer ' + token
      }
      cy.request({
        url: '/api/topics',
        method: 'POST',
        headers: authHeaders,
        active: true,
        body: {
          content: {
            email: 'asiakas@asiakas.com',
            title: newTopicName,
            description: topicDescription,
            environment: 'Web',
            customerName: customerName,
            additionalInfo: '',
            specialRequests: ''
          }
        }
      })
    })
  }
)

Cypress.Commands.add('setTopicActive', (topicId) => {
  withLoggedAdminToken((token) => {
    const authHeaders = {
      Authorization: 'Bearer ' + token
    }
    cy.request({
      url: `api/topics/${topicId}`,
      method: 'PUT',
      headers: authHeaders,
      body: {
        topic: {
          active: true
        }
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
        cy.request({
          url: '/api/registrationManagement',
          method: 'POST',
          headers: authHeaders,
          body: {
            registrationManagement: {
              peer_review_conf: 1,
              peer_review_open: true,
              peer_review_round: 1,
              project_registration_conf: 1,
              project_registration_open: true,
              project_registration_message: '',
              project_registration_info:
                'Project registration will be open until DD.MM.2019.',
              topic_registration_conf: 1,
              topic_registration_open: true,
              topic_registration_message: ''
            }
          }
        })
      })
    })
  }
)

Cypress.Commands.add('deleteAllPeerReviews', () => {
  withLoggedAdminToken((token) => {
    const authHeaders = {
      Authorization: 'Bearer ' + token
    }
    cy.request({
      url: '/api/peerreview/all',
      method: 'GET',
      headers: authHeaders
    }).then((res) => {
      const allReviews = res.body
      for (const review of allReviews) {
        cy.request({
          url: `/api/peerreview/${review.id}`,
          method: 'DELETE',
          headers: authHeaders
        })
      }
    })
  })
})

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

Cypress.Commands.add('deleteAllEmailTemplates', () => {
  withLoggedAdminToken((token) => {
    const authHeaders = {
      Authorization: 'Bearer ' + token
    }
    cy.request({
      url: '/api/email/templates',
      method: 'DELETE',
      headers: authHeaders
    })
  })
})

const defaultEmailTemplates = () => ({
  topicAccepted: { finnish: '', english: '' },
  topicRejected: { finnish: '', english: '' }
})

Cypress.Commands.add(
  'updateEmailTemplate',
  (templateName, templateLanguage, text) => {
    withLoggedAdminToken((token) => {
      const authHeaders = {
        Authorization: 'Bearer ' + token
      }

      const body = defaultEmailTemplates()
      body[templateName][templateLanguage] = text

      cy.request({
        url: '/api/email/templates',
        method: 'POST',
        headers: authHeaders,
        body
      })
    })
  }
)

Cypress.Commands.add('updateAllEmailTemplates', (body) => {
  withLoggedAdminToken((token) => {
    const authHeaders = {
      Authorization: 'Bearer ' + token
    }

    cy.request({
      url: '/api/email/templates',
      method: 'POST',
      headers: authHeaders,
      body
    })
  })
})
