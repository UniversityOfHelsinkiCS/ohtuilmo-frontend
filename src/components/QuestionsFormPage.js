import React from 'react'
import { connect } from 'react-redux'
import questionsPageActions from '../reducers/actions/questionsFormPageActions'
import QuestionsForm from './QuestionsForm'
import registrationQuestionSetService from '../services/registrationQuestionSet'
import reviewQuestionSetService from '../services/reviewQuestionSet'
import notificationActions from '../reducers/actions/notificationActions'

class QuestionsFormPage extends React.Component {
  componentDidMount() {
    this.fetchQuestions()
  }

  handleError = (e) => {
    console.log('error happened', e.response)
    this.props.setError('Some error happened')
    setTimeout(() => {
      this.props.clearNotifications()
    }, 3000)
  }

  handleSuccess = (msg) => {
    this.props.setSuccess(msg)
    setTimeout(() => {
      this.props.clearNotifications()
    }, 5000)
  }

  async fetchQuestions() {
    try {
      const fetchedRegistrationQuestionSets = await registrationQuestionSetService.getAll()
      const fetchedReviewQuestionSets = await reviewQuestionSetService.getAll()
      this.props.updateRegistrationQuestionSets(fetchedRegistrationQuestionSets)
      this.props.updateReviewQuestionSets(fetchedReviewQuestionSets)
    } catch (e) {
      this.handleError(e)
    }
  }

  submitNewRegistrationQuestionSet = async event => {
    event.preventDefault()
    try {
      await registrationQuestionSetService.create(this.props.selected_question_set)
      this.handleSuccess('Registration created successfully')
      this.fetchQuestions()
      this.props.clearSelectedQuestionSet()
    } catch (e) {
      this.handleError(e)
    }
  }

  editOldRegistrationQuestionSet = async event => {
    event.preventDefault()
    try {
      await registrationQuestionSetService.update(this.props.selected_question_set)
      this.handleSuccess('Registration updated successfully')
      this.fetchQuestions()
      this.props.clearSelectedQuestionSet()
    } catch (e) {
      this.handleError(e)
    }
  }

  submitNewReviewQuestionSet = async event => {
    event.preventDefault()
    try {
      await reviewQuestionSetService.create(this.props.selected_question_set)
      this.handleSuccess('Review created successfully')
      this.fetchQuestions()
      this.props.clearSelectedQuestionSet()
    } catch (e) {
      this.handleError(e)
    }
  }

  editOldReviewQuestionSet = async event => {
    event.preventDefault()
    try {
      await reviewQuestionSetService.update(this.props.selected_question_set)
      this.handleSuccess('Review updated successfully')
      this.fetchQuestions()
      this.props.clearSelectedQuestionSet()
    } catch (e) {
      this.handleError(e)
    }
  }

  updateSelectedQuestionSet = value => {
    try {
      if (value === 'new_is_selected') {
        this.props.clearSelectedQuestionSet()
      } else {
        let selected_question_set
        if (this.props.mode === 'registration') {
          selected_question_set = this.props.registration_question_sets.find(qs => qs.name === value)
        } else {
          selected_question_set = this.props.review_question_sets.find(qs => qs.name === value)
        }
        const selected_question_set_with_old_name = {
          ...selected_question_set,
          old_name: selected_question_set.name
        }
        this.props.updateSelectedQuestionSet(selected_question_set_with_old_name)
      }
    } catch (e) {
      this.handleError(e)
    }
  }

  render() {
    return (
      <div>
        {this.props.mode === 'registration'
          ? <QuestionsForm
            title='Configure registration questions'
            question_sets={this.props.registration_question_sets}
            selected_question_set={this.props.selected_question_set}
            submitNewQuestionSet={this.submitNewRegistrationQuestionSet}
            editOldQuestionSet={this.editOldRegistrationQuestionSet}
            updateSelectedQuestionSet={this.updateSelectedQuestionSet}
            updateSelectedQuestionSetName={this.props.updateSelectedQuestionSetName}
            updateSelectedQuestionSetQuestions={this.props.updateSelectedQuestionSetQuestions}

          />
          : <QuestionsForm
            title='Configure review questions'
            question_sets={this.props.review_question_sets}
            selected_question_set={this.props.selected_question_set}
            submitNewQuestionSet={this.submitNewReviewQuestionSet}
            editOldQuestionSet={this.editOldReviewQuestionSet}
            updateSelectedQuestionSet={this.updateSelectedQuestionSet}
            updateSelectedQuestionSetName={this.props.updateSelectedQuestionSetName}
            updateSelectedQuestionSetQuestions={this.props.updateSelectedQuestionSetQuestions}
          />
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    registration_question_sets: state.questionsFormPage.registration_question_sets,
    review_question_sets: state.questionsFormPage.review_question_sets,
    selected_question_set: state.questionsFormPage.selected_question_set,
    mode: state.questionsFormPage.mode,
    form: state.questionsFormPage.form
  }
}

const mapDispatchToProps = {
  ...questionsPageActions,
  ...notificationActions
}

const ConnectedQuestionsFormPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionsFormPage)

export default ConnectedQuestionsFormPage