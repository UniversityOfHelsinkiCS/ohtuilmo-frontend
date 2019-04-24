/*describe('Customer review is shown', () => {
    before(() => {
      cy.loginAsAdmin()
      cy.createCustomerReviewQuestionSet(
        answerSheet: [
            {
              "type": "text",
              "header": "Mitä mieltä olit tykittelystä?",
              "description": "Vastaa lyhyesti 5000 merkillä"
            },
            {
              "type": "number",
              "header": "Monta tuntia viikossa olit yhteydessä tiimiin?"
            },
            {
              "type": "range",
              "header": "Minkä arvosanan antaisit tiimille?",
              "description": "Pienet epätykittelyt on ihan ok",
              "options": ["1", "2", "3", "4", "5"]
            }
          ],
        group_id,
      ])
      cy.createConfiguration({
        name: 'Conf 2',
        content: '',
        registration_question_set_id: null,
        review_question_set_1_id: null,
        review_question_set_2_id: null,
        customer_review_question_set_id: 2    
      })
      cy.createTopic({
        content: {
            title: 'Conf 2 Topic C',
            customerName: 'Super nice customer',
            email: 'aaasikas@acee',
            description: 'Decription..',
            environment: 'Webbi',
            specialRequests: '',
            additionalInfo: ''
          }  
      }, 2)
      cy.createTopic({
        content: {
            title: 'Conf 2 Topic D',
            customerName: 'Super mad customer',
            email: 'aaasikas@acee',
            description: 'Decription..',
            environment: 'Webbi',
            specialRequests: '',
            additionalInfo: ''
          }  
      }, 2)
      cy.createGroup({
        name: 'The group of the groups 1',
        topicId: 1,
        configurationId: 1,
        instructorId: null,
        studentIds: ['012345678', '012345698']
      })
      cy.createGroup({
        name: 'The group of the groups 2',
        topicId: 2,
        configurationId: 1,
        instructorId: null,
        studentIds: ['012345678', '012345698']
      })
      cy.createGroup({
        name: 'The group of the groups 3',
        topicId: 3,
        configurationId: 2,
        instructorId: null,
        studentIds: ['012345678', '012345698']
      })
      cy.createGroup({
        name: 'The group of the groups 4',
        topicId: 4,
        configurationId: 2,
        instructorId: null,
        studentIds: ['012345678', '012345698']
      })
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
  
    it('shows an error if none of the fields is filled', () => {
      cy.loginAsRegisteredUser()
      cy.visit('/peerreview')
      cy.contains('Submit').click()
      cy.contains('You must answer all questions')
    })
    it('shows an error if only one of the fields is filled', () => {
      cy.loginAsRegisteredUser()
      cy.visit('/peerreview')
      cy.get(
        '[data-cy="input_number_Previous experiene in software developement"]'
      )
        .type('{backspace}')
        .type('123')
      cy.contains('Submit').click()
      cy.contains('You must answer all questions')
    })
    it('shows an error if not all of the radio button questions is answered', () => {
      cy.loginAsRegisteredUser()
      cy.visit('/peerreview')
      cy.get(
        '[data-cy="input_number_Previous experiene in software developement"]'
      )
        .type('{backspace}')
        .type('123')
      cy.get('[data-cy="input_number_Without option?"]')
        .type('{backspace}')
        .type('123')
      cy.get('[name="Ok and with optionTimo *Teppo Tellervo Testaaja"]')
        .eq(3)
        .click()
      cy.contains('Submit').click()
      cy.contains('You must answer all questions')
    })
    it('shows a submit confimation when all field and butotns are filled properly', () => {
      cy.loginAsRegisteredUser()
      cy.visit('/peerreview')
      cy.get(
        '[data-cy="input_number_Previous experiene in software developement"]'
      )
        .type('{backspace}')
        .type('123')
      cy.get('[data-cy="input_number_Without option?"]')
        .type('{backspace}')
        .type('123')
      cy.get('[name="Ok and with optionTimo *Teppo Tellervo Testaaja"]')
        .eq(2)
        .click()
      cy.get('[name="Ok and with optionDonald John Trump"]')
        .eq(5)
        .click()
      cy.contains('Submit').click()
      cy.contains('Peer review saved!')
    })
  })*/
  