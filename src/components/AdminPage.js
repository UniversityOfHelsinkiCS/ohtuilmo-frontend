import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'
import './TopicFormPage.css'

const mockConfiguration = {
  registrationQuestions: [
    { question: 'This is a test question?', type: 'scale' },
    { question: 'Test scale question?', type: 'text' }
  ],
  reviewQuestions1: [
    { question: 'This is a test question?', type: 'scale' },
    { question: 'Test scale question?', type: 'text' },
    { question: 'This is a test question?', type: 'scale' },
    { question: 'Test scale question?', type: 'text' }
  ],
  reviewQuestions2: [
    { question: 'This is a test question?', type: 'scale' },
    { question: 'Test scale question?', type: 'text' }
  ]
}

class AdminPage extends React.Component {
  componentWillMount() {
    try {
      if (window.localStorage.getItem('loggedInUser') === null) {
        window.location.replace(process.env.PUBLIC_URL + '/')
      } else {
        const token = JSON.parse(window.localStorage.getItem('loggedInUser'))
        if (!token.user.admin || token === undefined || token === null) {
          window.location.replace(process.env.PUBLIC_URL + '/')
        }
      }
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Some error happened')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
    }
  }

  render() {
    const { registrationQuestions, reviewQuestions1, reviewQuestions2 } = mockConfiguration

    return (
      <div className="admin-page-container">
        <h3>Administration</h3>
        <h3>Questions</h3>
        <div>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <p style={{ flex: 6 }}>Registration questions</p>
                <Button style={{ flex: 1, marginRight: '60px', height: '40px' } } color='primary' variant='contained' >Configure</Button>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Divider />
                {registrationQuestions.map((questionItem, index) => (
                  <div key={index}>
                    <p>Question: {questionItem.question}</p>
                    <p>Type: {questionItem.type}</p>
                    <Divider />
                  </div>
                ))}
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <p style={{ flex: 6 }}>Review questions 1</p>
                <Button style={{ flex: 1, marginRight: '60px', height: '40px' } } color='primary' variant='contained' >Configure</Button>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Divider />
                {reviewQuestions2.map((questionItem, index) => (
                  <div key={index}>
                    <p>Question: {questionItem.question}</p>
                    <p>Type: {questionItem.type}</p>
                    <Divider />
                  </div>
                ))}
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
              <div style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <p style={{ flex: 6 }}>Review questions 2</p>
                <Button style={{ flex: 1, marginRight: '60px', height: '40px' } } color='primary' variant='contained' >Configure</Button>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Divider />
                {reviewQuestions1.map((questionItem, index) => (
                  <div key={index}>
                    <p>Question: {questionItem.question}</p>
                    <p>Type: {questionItem.type}</p>
                    <Divider />
                  </div>
                ))}
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    state: state
  }
}

const mapDispatchToProps = {
}

const ConnectedAdminPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage)

export default ConnectedAdminPage
