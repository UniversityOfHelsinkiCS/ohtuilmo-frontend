// cy.type supports keystrokes e.g. {enter} sends enter key -> need to escape {
const escapeJsonForCypressType = (json) => json.replace(/\{/g, '{{}')

const submitCreationForm = (name, questionsJson) => {
  cy.get('.question-set-form .question-set-form__name').type(name)
  cy.get('.question-set-form .question-set-form__questions').type(
    escapeJsonForCypressType(questionsJson)
  )
  cy.get('.question-set-form button[type="submit"]').click()
}

const createQuestionSet = (name, questions) => {
  submitCreationForm(name, JSON.stringify(questions))
}

const editQuestionSet = (questionSetItemSelector) => {
  cy.get(questionSetItemSelector)
    .find('.question-set-item-controls__menu-button')
    .click()
  cy.get('#question-set-item-controls__menu')
    .find('.question-set-item-controls__edit-button')
    .click()
}

const replaceEditingQuestionSetName = (questionSetItemSelector, newName) => {
  cy.get(questionSetItemSelector)
    .find('.question-set-form__name')
    .clear()
    .type(newName)
}

const replaceEditingQuestionSetJson = (questionSetItemSelector, json) => {
  cy.get(questionSetItemSelector)
    .find('.question-set-form__questions')
    .clear()
    .type(json)
}

const replaceEditingQuestionSet = (questionSetItemSelector, newQuestions) => {
  replaceEditingQuestionSetJson(
    questionSetItemSelector,
    escapeJsonForCypressType(JSON.stringify(newQuestions))
  )
}

const clearEditingQuestionSetInputs = (selector) => {
  cy.get(selector)
    .find('.question-set-form__name')
    .clear()
  cy.get(selector)
    .find('.question-set-form__questions')
    .clear()
}

const saveEditingQuestionSet = (questionSetItemSelector) => {
  cy.get(questionSetItemSelector)
    .find('.editor-question-set-item__save-button')
    .click()
}

const cancelEditingQuestionSet = (selector) => {
  cy.get(selector)
    .find('.editor-question-set-item__cancel-button')
    .click()
}

describe('Page access as admin', () => {
  beforeEach(() => {
    cy.loginAsAdmin()
    cy.deleteRegistrationQuestions()
  })

  describe('Registration question set creation', () => {
    beforeEach(() => {
      cy.visit('/administration/registration-questions')
    })

    it('creates a new registration question set', () => {
      createQuestionSet('k2000', [{ question: 'foo?', type: 'scale' }])

      cy.get('.notification').contains(
        'Created new registration question set "k2000"'
      )
      cy.get('.question-set-item__content .questions-table-row').should(
        'have.length',
        1
      )
      cy.get('.question-set-item .question-set-item__title').should(
        'have.text',
        'k2000'
      )
      cy.get('.question-set-item .question-set-item__content').contains('foo?')
      cy.get('.question-set-item .question-set-item__content').contains('scale')
      cy.get('.question-set-list')
        .find('.question-set-item')
        .should('have.length', 1)
    })

    it('creates questions of type scale, text and <empty>', () => {
      createQuestionSet('k2000', [
        {
          question: 'This is a title'
        },
        {
          question: 'Rate your yeet 1-5',
          type: 'scale'
        },
        { question: 'Your life story plz', type: 'text' }
      ])

      cy.get('.question-set-item__content .questions-table-row').should(
        'have.length',
        3
      )
      cy.get('.question-set-item__content').contains('This is a title')
      cy.get('.question-set-item__content').contains('Rate your yeet 1-5')
      cy.get('.question-set-item__content').contains('scale')
      cy.get('.question-set-item__content').contains('Your life story plz')
      cy.get('.question-set-item__content').contains('text')
    })

    it('does not allow creation if name is duplicate', () => {
      createQuestionSet('k2000', [{ question: 'foo?', type: 'scale' }])
      createQuestionSet('k2000', [{ question: 'foo?', type: 'scale' }])

      cy.get('.notification').contains('name already in use')
      cy.get('.question-set-list')
        .find('.question-set-item')
        .should('have.length', 1)
    })

    it('does not allow creation if JSON is malformed', () => {
      submitCreationForm('k3000', '.-a,1:"#123-')

      cy.get('.question-set-form').contains('Field contains invalid JSON')
      cy.get('.question-set-list')
        .find('.question-set-item')
        .should('have.length', 0)
    })
  })

  describe('Registration question set editing', () => {
    beforeEach(() => {
      cy.createRegistrationQuestionSet('k2000', [
        { question: 'foo?', type: 'text' }
      ])
      cy.visit('/administration/registration-questions')
    })

    it('does not save changes if both name and questions are empty', () => {
      editQuestionSet('.question-set-item')
      clearEditingQuestionSetInputs('.editor-question-set-item')
      // "required" attr should prevent submit now
      saveEditingQuestionSet('.editor-question-set-item')
      // since the submit was prevented, the component is still
      // .editor-question-set-item and not .question-set-item
      cy.get('.editor-question-set-item')
    })

    it('shows error if new JSON is invalid', () => {
      editQuestionSet('.question-set-item')
      replaceEditingQuestionSetJson(
        '.editor-question-set-item',
        '..-12.31-23.1-23.asdasc'
      )
      saveEditingQuestionSet('.editor-question-set-item')
      cy.get('.question-set-form').contains('Field contains invalid JSON')
    })

    it('edits name without changing questions', () => {
      editQuestionSet('.question-set-item')
      replaceEditingQuestionSetName('.editor-question-set-item', 'k2021')
      saveEditingQuestionSet('.editor-question-set-item')

      cy.get('.question-set-item__title').should('have.text', 'k2021')
      cy.get('.question-set-item__content .questions-table-row').should(
        'have.length',
        1
      )
      cy.get('.question-set-item__content').contains('foo?')
    })

    it('edits questions without changing name', () => {
      editQuestionSet('.question-set-item')
      replaceEditingQuestionSet('.editor-question-set-item', [
        { question: 'foo!', type: 'text' }
      ])
      saveEditingQuestionSet('.editor-question-set-item')

      cy.get('.question-set-item__title').should('have.text', 'k2000')
      cy.get('.question-set-item__content .questions-table-row').should(
        'have.length',
        1
      )
      cy.get('.question-set-item__content').contains('foo!')
      cy.get('.question-set-item__content').contains('text')
    })

    it('does not modify set if cancel is clicked', () => {
      editQuestionSet('.question-set-item')
      replaceEditingQuestionSetName('.editor-question-set-item', 'foobar')
      replaceEditingQuestionSet('.editor-question-set-item', [
        { question: 'foo!', type: 'text' }
      ])
      cancelEditingQuestionSet('.editor-question-set-item')

      cy.get('.question-set-item__title').should('have.text', 'k2000')
      cy.get('.question-set-item__content .questions-table-row').should(
        'have.length',
        1
      )
      cy.get('.question-set-item__content').contains('foo?')
      cy.get('.question-set-item__content').contains('text')
    })

    it('edits both name and questions correctly', () => {
      editQuestionSet('.question-set-item')
      replaceEditingQuestionSetName('.editor-question-set-item', 'k5555')
      replaceEditingQuestionSet('.editor-question-set-item', [
        { question: 'this is a title' },
        { question: 'this is a scale', type: 'scale' }
      ])
      saveEditingQuestionSet('.editor-question-set-item')

      cy.get('.question-set-item__title').should('have.text', 'k5555')
      cy.get('.question-set-item__content .questions-table-row').should(
        'have.length',
        2
      )
      cy.get('.question-set-item__content').contains('this is a title')
      cy.get('.question-set-item__content').contains('this is a scale')
    })
  })
})
