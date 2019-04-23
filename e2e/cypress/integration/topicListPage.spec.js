/* globals cy describe beforeEach it expect */
const visitTopicsPage = (visitArgs) => cy.visit('/topics', visitArgs)

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
  const topicName = 'Aihe A'

  describe('emails', () => {
    beforeEach(() => {
      cy.loginAsAdmin()
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

    const emailAddress = 'aasia@kas'

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
