import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Paper from '@material-ui/core/Paper'

import {
  fetchRegistrationQuestionSets,
  createRegistrationQuestionSet
} from '../../reducers/actions/registrationQuestionsPageActions'
import {
  setError,
  setSuccess
} from '../../reducers/actions/notificationActions'

import { questionSetShape } from './common'
import CreateQuestionSet from './CreateQuestionSet'
import QuestionSetList from './QuestionSetList'
import './RegistrationQuestionsPage.css'

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
      console.log('error happened', e.response)
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

  async fetchQuestions() {
    try {
      await this.props.fetchRegistrationQuestionSets()
    } catch (e) {
      this.handleError(e)
    }
  }
  handleError = (e) => {
    console.log('error happened', e, e.response)
    this.props.setError('Some error happened', 3000)
  }

  handleSuccess = (msg) => {
    this.props.setSuccess(msg, 5000)
  }

  handleCreateQuestionSet = async (name, questions) => {
    try {
      await this.props.createRegistrationQuestionSet(name, questions)
    } catch (err) {
      console.error('Error while creating question set', err)
      this.handleError(err)
    }
  }

  render() {
    console.log('props', this.props)
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
              <CreateQuestionSet onSubmit={this.handleCreateQuestionSet} />
            </Paper>
          </section>
          <section>
            <h2>Question sets</h2>
            <QuestionSetList />
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
  fetchRegistrationQuestionSets: PropTypes.func
}

const mapStateToProps = (state) => ({
  questionSets: state.registrationQuestionsPage.questionSets
})

const mapDispatchToProps = {
  fetchRegistrationQuestionSets,
  createRegistrationQuestionSet,
  setError,
  setSuccess
}

const ConnectedQuestionsFormPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationQuestionsPage)

export default withRouter(ConnectedQuestionsFormPage)
