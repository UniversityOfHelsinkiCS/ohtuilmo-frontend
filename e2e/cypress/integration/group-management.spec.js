const { loginAsUser, TEST_USER, TEST_USER2, TEST_ADMIN } = require('../common')

describe.only('Group management UI', () => {
  before(() => {
    cy.clearLocalStorage()
    cy.visit('/')
    loginAsUser(TEST_ADMIN)
    cy.get('.nav-menu-button').click()
    cy.get('.group-management-menu-item').click()
  })

  describe('Forming a group', () => {
    it('is successful when all necessary details are provided', () => {
      cy.get('.configuration-selector').click()
      cy.get('.configuration-1').click()
      cy.get('.create-group-topic-selector').click()
      cy.get('.topic-1').click()
      cy.get('.create-group-name input').type('Ryhmä A')
      cy.get('.create-group-student textarea').type('012345678, 012345688')
      cy.get('.create-group-instructor input').type('012345698')
      cy.get('.create-group-submit').click()
      cy.get('.notification').should('have.text', 'Group saved!')
    })
  })

  describe('Editing a group', () => {
    it('deletes a group', () => {})
  })
})
