const visitTopicsPage = () => cy.visit('/topics')

describe('Topic list page', () => {
  describe('email preview', () => {
    beforeEach(() => {
      cy.loginAsAdmin()
      cy.updateAllEmailTemplates({
        topicAccepted: {
          finnish: 'Projekti {{topicName}} hyväksytty.',
          english: 'Project {{topicName}} was accepted.'
        },
        topicRejected: {
          finnish: 'Projekti {{topicName}} hylätty.',
          english: 'Project {{topicName}} was rejected.'
        }
      })
      visitTopicsPage()
    })

    const topicName = 'Aihe A'

    it('shows the correctly rendered email confirm for topic accepted (finnish) template', () => {
      cy.on('window:confirm', (confirmText) => {
        expect(confirmText).to.contain(`Projekti ${topicName} hyväksytty.`)
      })

      cy.get(`[data-cy-topic-name="${topicName}"]`)
        .find('button[value="Finnish-Yes"]')
        .click()
    })

    it('shows the correctly rendered email confirm for topic accepted (english) template', () => {
      cy.on('window:confirm', (confirmText) => {
        expect(confirmText).to.contain(`Project ${topicName} was accepted.`)
      })

      cy.get(`[data-cy-topic-name="${topicName}"]`)
        .find('button[value="English-Yes"]')
        .click()
    })

    it('shows the correctly rendered email confirm for topic rejected (finnish) template', () => {
      cy.on('window:confirm', (confirmText) => {
        expect(confirmText).to.contain(`Project ${topicName} hylätty.`)
      })

      cy.get(`[data-cy-topic-name="${topicName}"]`)
        .find('button[value="English-No"]')
        .click()
    })

    it('shows the correctly rendered email confirm for topic rejected (english) template', () => {
      cy.on('window:confirm', (confirmText) => {
        expect(confirmText).to.contain(`Project ${topicName} was rejected.`)
      })

      cy.get(`[data-cy-topic-name="${topicName}"]`)
        .find('button[value="English-No"]')
        .click()
    })
  })
})
