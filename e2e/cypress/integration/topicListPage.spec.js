/* globals cy describe beforeEach it expect */
const visitTopicsPage = (visitArgs) => cy.visit('/topics', visitArgs)

const findTopicActiveCheckbox = (topicName) =>
  cy
    .get(`[data-cy-topic-name="${topicName}"]`)
    .find('[data-cy="toggle-active"]')

const getSendAcceptButton = (topicName) =>
  cy
    .get(`[data-cy-topic-name="${topicName}"]`)
    .find('[data-cy="send-accept-mail"]')

const getSendRejectButton = (topicName) =>
  cy
    .get(`[data-cy-topic-name="${topicName}"]`)
    .find('[data-cy="send-reject-mail"]')

const clickSendAcceptEmail = (topicName) =>
  getSendAcceptButton(topicName).click()

const clickSendRejectEmail = (topicName) =>
  getSendRejectButton(topicName).click()

/** @param {'finnish' | 'english'} language */
const clickEmailLanguage = (language) =>
  cy
    .get('[data-cy="email-language-menu"]')
    .find(`[data-cy-send-mail-lang="${language}"]`)
    .click()

describe('Topic list page', () => {
  beforeEach(() => {
    cy.loginAsAdmin()
  })

  describe('topics', () => {
    const toggleTestTopicName = 'Aihe C'

    beforeEach(() => {
      visitTopicsPage()
    })

    it('renders the topic names correctly', () => {
      const topicTitles = ['Aihe A', 'Aihe B']

      for (const topicTitle of topicTitles) {
        cy.get(`[data-cy-topic-name="${topicTitle}"]`)
          .find('.topic-table-row__topic-title')
          .should('have.text', topicTitle)
      }
    })

    it('renders the customer names and emails correctly', () => {
      cy.get('[data-cy-topic-name="Aihe A"]')
        .find('.topic-table-row__customer')
        .contains('Aasiakas')
      cy.get('[data-cy-topic-name="Aihe A"]')
        .find('.topic-table-row__customer')
        .contains('aasia@kas')
    })

    it('toggles topic active state correctly', () => {
      // get initial checked state
      findTopicActiveCheckbox(toggleTestTopicName).then(($input) => {
        const desiredState = $input.prop('checked')
          ? 'not.be.checked'
          : 'be.checked'

        // toggle active
        findTopicActiveCheckbox(toggleTestTopicName).click()

        // did it change state?
        findTopicActiveCheckbox(toggleTestTopicName).should(desiredState)

        visitTopicsPage()

        // still in correct state after refresh?
        findTopicActiveCheckbox(toggleTestTopicName).should(desiredState)
      })
    })
  })

  describe('emails', () => {
    const topicName = 'Aihe A'
    const emailAddress = 'aasia@kas'

    beforeEach(() => {
      cy.deleteSentEmails()
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
      visitTopicsPage({
        // spy window.confirm for email preview tests
        onBeforeLoad(win) {
          cy.spy(win, 'confirm')
        }
      })
    })

    it('shows email languages after clicking accept', () => {
      clickSendAcceptEmail(topicName)

      cy.get('[data-cy="email-language-menu"]')
        .should('be.visible')
        .and('have.descendants', '[data-cy-send-mail-lang="finnish"]')
        .and('have.descendants', '[data-cy-send-mail-lang="english"]')
    })

    it('shows email languages after clicking reject', () => {
      clickSendRejectEmail(topicName)

      cy.get('[data-cy="email-language-menu"]')
        .should('be.visible')
        .and('have.descendants', '[data-cy-send-mail-lang="finnish"]')
        .and('have.descendants', '[data-cy-send-mail-lang="english"]')
    })

    it('shows a success popup after sending an email', () => {
      clickSendAcceptEmail(topicName)
      clickEmailLanguage('finnish')

      cy.get('.notification').contains(`Email sent to ${emailAddress}.`)
    })

    it('shows a success popup after re-sending an email', () => {
      clickSendAcceptEmail(topicName)
      clickEmailLanguage('finnish')
      cy.get('.notification').contains(`Email sent to ${emailAddress}.`)

      clickSendAcceptEmail(topicName)
      clickEmailLanguage('finnish')
      cy.get('.notification').contains(`Email sent to ${emailAddress}.`)
    })

    describe('accept/reject buttons', () => {
      it('changes accept button text to "resend accept" after sending', () => {
        getSendAcceptButton(topicName).should('have.text', 'Accept')

        clickSendAcceptEmail(topicName)
        clickEmailLanguage('finnish')

        getSendAcceptButton(topicName).should('have.text', 'Resend Accept')
      })

      it('changes reject button text to "resend reject" after sending', () => {
        getSendRejectButton(topicName).should('have.text', 'Reject')

        clickSendRejectEmail(topicName)
        clickEmailLanguage('finnish')

        getSendRejectButton(topicName).should('have.text', 'Resend Reject')
      })

      it('does not change the buttons of another topic after sending accept and reject', () => {
        getSendAcceptButton('Aihe B').should('have.text', 'Accept')
        getSendRejectButton('Aihe B').should('have.text', 'Reject')

        clickSendAcceptEmail('Aihe A')
        clickEmailLanguage('english')
        clickSendRejectEmail('Aihe A')
        clickEmailLanguage('english')

        getSendAcceptButton('Aihe B').should('have.text', 'Accept')
        getSendRejectButton('Aihe B').should('have.text', 'Reject')
      })
    })

    describe('email preview', () => {
      it('shows the correctly rendered email confirm for topic accepted (finnish) template', () => {
        clickSendAcceptEmail(topicName)
        clickEmailLanguage('finnish')
        cy.window()
          .its('confirm')
          .should((confirmSpy) => {
            expect(confirmSpy).to.be.calledOnce
            expect(confirmSpy.getCall(0).args[0]).to.contain(
              `Projekti ${topicName} hyväksytty.`
            )
          })
      })

      it('shows the correctly rendered email confirm for topic accepted (english) template', () => {
        clickSendAcceptEmail(topicName)
        clickEmailLanguage('english')
        cy.window()
          .its('confirm')
          .should((confirmSpy) => {
            expect(confirmSpy).to.be.calledOnce
            expect(confirmSpy.getCall(0).args[0]).to.contain(
              `Project ${topicName} was accepted.`
            )
          })
      })

      it('shows the correctly rendered email confirm for topic rejected (finnish) template', () => {
        clickSendRejectEmail(topicName)
        clickEmailLanguage('finnish')
        cy.window()
          .its('confirm')
          .should((confirmSpy) => {
            expect(confirmSpy).to.be.calledOnce
            expect(confirmSpy.getCall(0).args[0]).to.contain(
              `Projekti ${topicName} hylätty.`
            )
          })
      })

      it('shows the correctly rendered email confirm for topic rejected (english) template', () => {
        clickSendRejectEmail(topicName)
        clickEmailLanguage('english')
        cy.window()
          .its('confirm')
          .should((confirmSpy) => {
            expect(confirmSpy).to.be.calledOnce
            expect(confirmSpy.getCall(0).args[0]).to.contain(
              `Project ${topicName} was rejected.`
            )
          })
      })
    })
  })
})
