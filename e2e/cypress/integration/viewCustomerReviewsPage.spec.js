const mockAnswers = [
  {
    type: 'info',
    header: 'Ohje',
    description:
      'Ohje: Anna avovastauksiin vapaamuotoiset perustelut arvosanaehdotuksille. Voit käyttääapuna vinkkeinä annettuna esimerkkejä asioista, joihin voi kiinnittää huomiota. Voit myöskertoa vapaasti muista mielestäsi olennaisista asioista. Arvioi jokainen ryhmäläinen. Kirjoitaitseäsi koskevat perustelut erityisen huolellisesti. Huomaa, että saadakseen kurssistaarvosanaksi 5 ei jokaisen osa alueen tarvitse olla täydellinen. On luontevaa, että ryhmässäkontribuutioden painopisteet jakautuvat eri tavoin ja tämä on täysin ok myös tällä kurssilla.'
  },
  {
    id: 1,
    type: 'number',
    answer: 5,
    questionHeader: 'Grade (scale 0-5)  '
  },
  {
    id: 2,
    type: 'text',
    answer:
      'Your satisfaction to the resulting product compared to your intial expectations:Your satisfaction to the resulting product compared to your intial expectations:',
    questionHeader:
      'Your satisfaction to the resulting product compared to your intial expectations:'
  },
  {
    id: 3,
    type: 'text',
    answer:
      'Your satisfaction to the resulting product compared to your intial expectations:Your satisfaction to the resulting product compared to your intial expectations:',
    questionHeader: 'The quality of the product and fit for the purpose:'
  },
  {
    id: 4,
    type: 'text',
    answer:
      'Your satisfaction to the resulting product compared to your intial expectations:Your satisfaction to the resulting product compared to your intial expectations:',
    questionHeader:
      'What was the technical skill level of the team compared to your expectations?'
  }
]

describe('Customer review is shown', () => {
  before(() => {
    cy.loginAsAdmin()
    cy.createConfiguration({
      name: 'Conf 2',
      content: '',
      registration_question_set_id: null,
      review_question_set_1_id: null,
      review_question_set_2_id: null,
      customer_review_question_set_id: null
    })
    cy.createTopic(
      {
        title: 'Conf 2 Topic C',
        customerName: 'Super nice customer',
        email: 'asiakas@cee',
        description: 'Decription..',
        environment: 'Webbi',
        specialRequests: '',
        additionalInfo: ''
      },
      2
    )
    cy.createTopic(
      {
        title: 'Conf 2 Topic D',
        customerName: 'Super mad customer',
        email: 'aasiakas@bee',
        description: 'Decription..',
        environment: 'Webbi',
        specialRequests: '',
        additionalInfo: ''
      },
      2
    )
    const id1 = cy.createGroupAndReturnId({
      name: 'The group of the groups 1',
      topicId: 1,
      configurationId: 1,
      instructorId: null,
      studentIds: ['012345678', '012345698']
    })
    console.log('GROUP ID', id1)
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
    cy.createCustomerReview({
      answer_sheet: mockAnswers,
      group_id: id1,
      topic_id: 1,
      configuration_id: 1
    })
    cy.createCustomerReview({
      answer_sheet: mockAnswers,
      group_id: 2,
      topic_id: 2,
      configuration_id: 1
    })
    cy.createCustomerReview({
      answer_sheet: mockAnswers,
      group_id: 4,
      topic_id: 5,
      configuration_id: 2
    })
  })
  it('admin can visit customer reviews page', () => {
    cy.loginAsAdmin()
    cy.visit('/adminstration/customer-reviews')
    cy.contains('Customer reviews')
  })
  it('all configurations are shwon', () => {
    cy.loginAsAdmin()
    cy.visit('/adminstration/customer-reviews')
    cy.contains('Customer reviews')
    cy.get('[data-cy="customer-reviews-select"]').click()
    cy.get('[data-cy="all-configurations"]').click()
    cy.contains('The group of the groups 1')
    cy.contains('The group of the groups 4')
  })
  it('customer reviews for configuration 1 are shown', () => {
    cy.loginAsAdmin()
    cy.visit('/adminstration/customer-reviews')
    cy.get('[data-cy="customer-reviews-select"]').click()
    cy.get('[data-cy="Konfiguraatio 1"]').click()
    cy.contains('The group of the groups 1')
    cy.contains('The group of the groups 2')
  })
  it('customer reviews for configuration 2 are shown', () => {
    cy.loginAsAdmin()
    cy.visit('/adminstration/customer-reviews')
    cy.get('[data-cy="customer-reviews-select"]').click()
    cy.get('[data-cy="Conf 2"]').click()
    cy.contains('No review submitted for group The group of the groups 3')
    cy.contains('The group of the groups 4')
  })
  after(() => {})
})
