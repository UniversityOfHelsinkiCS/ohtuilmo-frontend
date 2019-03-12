describe('Group Management Page', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.loginAsAdmin()
    cy.visit('/administration/groups')
  })

  describe('Creating a group', () => {
    it('is successful when all necessary details are provided', () => {
      cy.get('.configuration-selector').click()
      cy.get('.configuration-1').click()
      cy.get('.create-group-form-topic__selector').click()
      cy.get('.topic-menu-item-no__1').click()
      cy.get('.create-group-form__name').type('Ryhmä A')
      cy.get('.create-group-form__student-input').type('012345678, 012345688')
      cy.get('.create-group-form__instructor').type('012345698')
      cy.get('.create-group-submit').click()
      cy.get('.notification').should('have.text', 'Group saved!')
    })
  })

  describe('Viewing a group', () => {
    beforeEach(() => {
      cy.get('.configuration-selector').click()
      cy.get('.configuration-1').click()
    })

    it('deletes a student', () => {
      cy.get('.edit-group-no__1__delete-student-no__1').click()
      cy.get('.view-group-no__1__container .group-students').should(
        'not.contain',
        '012345688'
      )
      cy.get('.notification').should('have.text', 'Student deleted!')
    })

    it('deletes an instructor', () => {
      cy.get('.edit-group-no__1__delete-instructor').click()
      cy.get('.view-group-no__1__container .group-instructor').should(
        'not.contain',
        '012345698'
      )
      cy.get('.view-group-no__1__container .group-instructor').should(
        'contain',
        'No instructor assigned'
      )
      cy.get('.notification').should('have.text', 'Instructor deleted!')
    })
  })

  describe('Editing a group', () => {
    beforeEach(() => {
      cy.get('.configuration-selector').click()
      cy.get('.configuration-1').click()
      cy.get('.enable-edit-group-no__1').click()
      cy.get('.notification')
        .should('contain', 'Editing for group')
        .should('contain', 'enabled!')
    })

    it('changes group name', () => {
      cy.get('.edit-group-no__1__name')
        .clear()
        .type('Ryhmä B')
      cy.get('.edit-group-no__1__save-button').click()
      cy.get('.notification').should('have.text', 'Group updated!')
      cy.get('.view-group-no__1__container .group-name').should(
        'contain',
        'Ryhmä B'
      )
    })

    it('changes topic', () => {
      cy.get('.edit-group-form-topic__selector').click()
      cy.get('.topic-menu-item-no__2').click()
      cy.get('.edit-group-no__1__save-button').click()
      cy.get('.notification').should('have.text', 'Group updated!')
      cy.get('.view-group-no__1__container .group-topic').should(
        'contain',
        'Aihe B'
      )
    })

    it('changes instructor', () => {
      cy.get('.edit-group-no__1__instructor')
        .clear()
        .type('012345678')
      cy.get('.edit-group-no__1__save-button').click()
      cy.get('.notification').should('have.text', 'Group updated!')
      cy.get('.view-group-no__1__container .group-instructor').should(
        'contain',
        '012345678'
      )
    })

    it('adds new student', () => {
      cy.get('.edit-group-no__1__students').type(', 012345698')
      cy.get('.edit-group-no__1__save-button').click()
      cy.get('.notification').should('have.text', 'Group updated!')
      cy.get('.view-group-no__1__container .group-students').should(
        'contain',
        '012345698'
      )
    })

    it('deletes a group', () => {
      cy.get('.edit-group-no__1__delete-button').click()
      cy.get('.notification').should('have.text', 'Group deleted!')
    })
  })
})
