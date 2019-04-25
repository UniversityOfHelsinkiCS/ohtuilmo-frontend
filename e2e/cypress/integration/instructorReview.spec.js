const initTests = () => {
  cy.createGroup({
    name: 'Tykittelijät',
    topicId: 1,
    configurationId: 1,
    instructorId: '012345698',
    studentIds: ['012345678', '012345688']
  })
}
const submitInstructorReview = () => {
  cy.get('[data-cy="submit-instructor-review-button"]').click()
}

const answerTextInput = (text) => {
  cy.get('[data-cy="textInput-Kerro jaban tykittelyskillzeist"]').within(() => {
    cy.get('textarea').type(text)
  })
}
const answerRangeInput = (number) => {
  cy.get('[data-cy="rangeInput-Anna tykittely arvosana"]').within(() => {
    cy.get('input')
      .eq(number - 1)
      .click()
  })
}

describe('Instructor review page', () => {
  before(() => {
    initTests()
  })

  beforeEach(() => {
    cy.deleteInstructorReviews()
  })

  it('requires text fields to be filled', () => {
    submitInstructorReview()
    // submit not successfull, still on same page
    cy.url().should('contain', '/instructorreview')
    cy.contains('Instrucotr review')
  })

  /*it('shows error when text fields are under 30 characters long', () => {
    answerTextInput('foobar')
    submitInstructorReview()
    expectNotification('Text answers must be over 30 characters long.')
  })

  it('shows error when text fields are filled but there are other unfilled fields', () => {
    answerTextInput(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce at.'
    )
    submitInstructorReview()
    expectNotification('You must answer all questions')
  }) */
})
