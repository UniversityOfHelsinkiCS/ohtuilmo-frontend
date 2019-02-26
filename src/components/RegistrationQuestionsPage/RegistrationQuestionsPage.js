import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'

import {
  fetchRegistrationQuestionSets,
  updateRegistrationQuestionSet
} from '../../reducers/actions/registrationQuestionsPageActions'
import {
  setError,
  setSuccess
} from '../../reducers/actions/notificationActions'

import { questionSetShape } from './common'
import CreateQuestionSetForm from './CreateQuestionSetForm'
import EditableQuestionSetItem from './EditableQuestionSetItem'
import './RegistrationQuestionsPage.css'

const compareQuestionSetCreatedAtDesc = (a, b) =>
  b.createdAt.localeCompare(a.createdAt)

const QuestionSetList = ({ questionSets, onQuestionSetUpdate }) => {
  const byCreatedAtDesc = [...questionSets].sort(
    compareQuestionSetCreatedAtDesc
  )

  return (
    <ul className="question-set-list">
      {byCreatedAtDesc.map((set) => (
        <EditableQuestionSetItem
          key={set.id}
          questionSet={set}
          onEditSave={onQuestionSetUpdate}
        />
      ))}
    </ul>
  )
}

const isValidationError = (e) => e.response && e.response.status === 400

class RegistrationQuestionsPage extends React.Component {
  componentWillMount() {
    try {
      if (window.localStorage.getItem('loggedInUser') === null) {
        this.props.history.push('/')
      } else {
        const token = JSON.parse(window.localStorage.getItem('loggedInUser'))
        if (!token.user.admin || token === undefined || token === null) {
          this.props.history.push('/')
        }
      }
    } catch (e) {
      console.error('error happened', e.response)
      this.props.setError('Some error happened', 5000)
    }
  }

  async componentDidMount() {
    try {
      await this.props.fetchRegistrationQuestionSets()
    } catch (err) {
      this.handleError(err)
    }
  }

  handleError = (e) => {
    const { setError } = this.props

    console.error('error happened', e, e.response)
    if (isValidationError(e)) {
      // was error 400, server should have responded { "error": "..." }
      setError(`An error occurred: "${e.response.data.error}"!`, 5000)
    } else {
      setError('Some error happened', 3000)
    }
  }

  handleSuccess = (message) => {
    this.props.setSuccess(message, 3000)
  }

  handleQuestionSetUpdate = async (updatedQuestionSet) => {
    try {
      await this.props.updateRegistrationQuestionSet(updatedQuestionSet)
      this.handleSuccess(`Updated question set "${updatedQuestionSet.name}"!`)
    } catch (err) {
      this.handleError(err)
    }
  }

  render() {
    const { questionSets } = this.props

    return (
      <div className="registration-questions-page">
        <h1>Configure registration questions</h1>
        <div className="registration-questions-page__container">
          <section style={{ marginBottom: '2rem' }}>
            <h2>Create question set</h2>
            <Paper
              depth={1}
              className="registration-questions-page__create-form"
            >
              <CreateQuestionSetForm />
            </Paper>
          </section>
          <section>
            <h2>Question sets</h2>
            <QuestionSetList
              questionSets={questionSets}
              onQuestionSetUpdate={this.handleQuestionSetUpdate}
            />
          </section>
        </div>
      </div>
    )
  }
}

RegistrationQuestionsPage.propTypes = {
  questionSets: PropTypes.arrayOf(questionSetShape),
  history: PropTypes.any,
  setError: PropTypes.func,
  setSuccess: PropTypes.func,
  fetchRegistrationQuestionSets: PropTypes.func,
  updateRegistrationQuestionSet: PropTypes.func
}

const mapStateToProps = (state) => ({
  questionSets: state.registrationQuestionsPage.questionSets
})

const mapDispatchToProps = {
  fetchRegistrationQuestionSets,
  updateRegistrationQuestionSet,
  setError,
  setSuccess
}

const ConnectedQuestionsFormPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationQuestionsPage)

export default withRouter(ConnectedQuestionsFormPage)
