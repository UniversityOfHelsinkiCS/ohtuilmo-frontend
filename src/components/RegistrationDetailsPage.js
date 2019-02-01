import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import registrationActions from '../reducers/actions/registrationActions'

import Typography from '@material-ui/core/Typography'

class RegistrationDetailsPage extends React.Component {
  render() {
    const registration = this.props.ownRegistration
    const { student, preferred_topics, questions } = registration
    const { first_names, last_name, student_number, email } = student

    let firstname = ''
    if (first_names.includes('*')) {
      firstname = first_names.split('*')[1]
    }
    firstname = firstname.split(' ')[0]

    const sortedQuestions = questions.sort((a, b) => {
      if (a.type === 'scale' && b.type !== 'scale') {
        return -1
      } else if (a.type !== 'scale' && b.type === 'scale') {
        return 1
      }
      return 0
    })

    const firstOpenTextQuestion = sortedQuestions.findIndex((question) => {
      if (question.type === 'text') {
        return true
      }
      return false
    })

    const scaleQuestions = sortedQuestions.slice(0, firstOpenTextQuestion)
    const openTextquestions = sortedQuestions.slice(firstOpenTextQuestion)

    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Registration details
        </Typography>
        <div>
          <Typography variant="h5" gutterBottom>
            User details
          </Typography>
          <Typography variant="body1" gutterBottom>
            Name: {firstname} {last_name}
            <br />
            Student number: {student_number}
            <br />
            Email: {email}
            <br />
          </Typography>
        </div>
        <div>
          <Typography variant="h5" gutterBottom>
            Preferred topics
          </Typography>
          {preferred_topics.map((topic, index) => {
            const { title, customerName } = topic.content
            return (
              <Typography variant="body1" gutterBottom key={index}>
                {index + 1}. {title} from {customerName}
              </Typography>
            )
          })}
        </div>
        <div>
          <Typography variant="h5" gutterBottom>
            Answers to questions
          </Typography>
          <Typography variant="h6" gutterBottom>
            Scale (0-5) questions
          </Typography>
          {scaleQuestions.map((question, index) => {
            return (
              <Typography variant="body1" gutterBottom key={index}>
                {question.question}: {question.answer}
              </Typography>
            )
          })}
          <Typography variant="h6" gutterBottom>
            Open text questions
          </Typography>
          {openTextquestions.map((question, index) => {
            return (
              <Typography variant="body1" gutterBottom key={index}>
                Question: {question.question}
                <br />
                Answer: {question.answer}
              </Typography>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ownRegistration: state.registration
  }
}

const mapDispatchToProps = {
  fetchRegistration: registrationActions.fetchRegistration
}

const ConnectedRegistrationDetailsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationDetailsPage)

export default withRouter(ConnectedRegistrationDetailsPage)
