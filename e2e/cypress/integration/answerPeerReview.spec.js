describe('Answering peer review', () => {
  beforeEach(() => {
    cy.loginAsAdmin()
    cy.deleteReviewQuestions()
    cy.deleteAllGroups()
    cy.createGroup({
      name: 'The group of the groups',
      topicId: 1,
      configurationId: 1,
      instructorId: null,
      studentIds: ['012345678', '012345698']
    })
    cy.createReviewQuestionSet('Super nice review questions', [
      {
        type: 'info',
        header: 'This is info',
        description: 'Just fill the form'
      },
      {
        header: 'Previous experiene in software developemnt',
        description: 'How many hours?',
        type: 'number'
      },
      {
        header: 'Without option?',
        description: '',
        type: 'number'
      },
      {
        header: 'Ok and with option',
        description: 'Choose a radio button you want',
        type: 'radio',
        options: ['Cant say', 'Not at all', 'Little', 'Decent', 'Good', 'Super']
      }
    ])
    cy.setPeerReviewOneActive(
      'Konfiguraatio 1',
      1,
      'Super nice review questions'
    )
  })

  it('peer review is open', () => {
    cy.loginAsRegisteredUser()
    cy.visit('/peerreview')
    cy.get('.peer-review-container').contains('This is info')
  })
})
