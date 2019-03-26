import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import * as notificationActions from '../../reducers/actions/notificationActions'
import customerReviewPageActions from '../../reducers/actions/customerReviewPageActions'

import questionSet from '../questions/questions_data.json'

const Questions = ({ questions, answerSheet, updateAnswer }) => {
  console.log('qMap', questions)
  return (
    <div>
      {questions.map((question, questionId) => {
        return (
          <Question
            key={questionId}
            question={question}
            questionId={questionId}
            answerSheet={answerSheet}
            updateAnswer={updateAnswer}
          />
        )
      })}
    </div>
  )
}

const Question = ({ question, questionId, answerSheet, updateAnswer }) => {
  if (question.type === 'text') {
    return (
      <div className="customer-review-box">
        <h3 className="customer-review-box__h3">{question.header}</h3>
        <p>{question.description}</p>

        <TextField
          value={answerSheet[questionId].answer}
          rows="4"
          style={{ width: 400 }}
          multiline
          variant="outlined"
          onChange={(e) =>
            textFieldHandler(e.target.value, questionId, updateAnswer)
          }
        />
      </div>
    )
  } else if (question.type === 'number') {
    return (
      <div className="customer-review-box">
        <h3>{question.header}</h3>
        <p>{question.description}</p>

        <input
          type="number"
          value={answerSheet[questionId].answer}
          onChange={(e) =>
            textFieldHandler(e.target.value, questionId, updateAnswer)
          }
        />
      </div>
    )
  } else if (question.type === 'info') {
    return (
      <div className="customer-review-box">
        <h3>{question.header}</h3>
        <p>{question.description}</p>
      </div>
    )
  } else {
    return (
      <div>
        <p>Incorrect question type</p>
      </div>
    )
  }
}

const textFieldHandler = (value, questionId, updateAnswer) => {
  updateAnswer(value, questionId)
}

class CustomerReviewPage extends React.Component {
  componentWillMount() {}

  async componentDidMount() {
    try {
      /* const fetchedGroups = await groupManagementService.get() */

      console.log('cDM start')

      this.props.setQuestions(questionSet.questions)
      console.log('cwm q0', this.props.questionObject)

      console.log('preFetch')
      this.fetchCustomerReviewQuestions(questionSet.questions)
      console.log('postFetch')

      /* this.props.setGroups(fetchedGroups) */
    } catch (e) {
      this.props.setError('Some error happened')
    }
  }

  async fetchCustomerReviewQuestions(questionObject) {
    console.log('qO', questionObject)

    const initializeNumberAnswer = (question, questionId) => {
      return {
        type: 'number',
        questionHeader: question.header,
        id: questionId,
        answer: 0
      }
    }

    const initializeTextAnswer = (question, questionId) => {
      return {
        type: 'text',
        questionHeader: question.header,
        id: questionId,
        answer: ''
      }
    }

    const tempAnswerSheet = questionObject.map((question, questionID) => {
      if (question.type === 'text') {
        return initializeTextAnswer(question, questionID)
      } else if (question.type === 'number') {
        return initializeNumberAnswer(question, questionID)
      } else {
        return question
      }
    })

    this.props.initializeAnswerSheet(tempAnswerSheet)
  }

  Submit = async (event, answerSheet) => {
    event.preventDefault()

    const answer = window.confirm(
      'Answers can not be changed after submitting. Continue?'
    )
    if (!answer) return
    try {
      console.log(answerSheet)

      this.props.setSuccess('Review saved!')
      this.props.history.push('/')
    } catch (e) {
      console.log('error happened', e)
      this.props.setError(e.response.data.error)
    }
  }

  render() {
    const {
      answerSheet,
      updateAnswer,
      isInitializing,
      questionObject
    } = this.props
    console.log(questionSet.questions)

    console.log('question object', questionObject)
    console.log('answerSheet', answerSheet)

    if (isInitializing) {
      return (
        <div className="customer-review-container">
          <h1 className="customer-review-container__h1">Loading!</h1>
        </div>
      )
    } else {
      return (
        <div>
          <h2>Customer review</h2>

          <Questions
            questions={questionObject}
            answerSheet={answerSheet}
            updateAnswer={updateAnswer}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              margin-right="auto"
              margin-left="auto"
              variant="contained"
              color="primary"
              onClick={(event) => this.Submit(event, answerSheet)}
            >
              Submit
            </Button>
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    groups: state.groupPage.groups,
    answerSheet: state.customerReviewPage.answerSheet,
    isInitializing: state.customerReviewPage.isInitializing,
    questionObject: state.customerReviewPage.questions
  }
}

const mapDispatchToProps = {
  updateAnswer: customerReviewPageActions.updateAnswer,
  initializeAnswerSheet: customerReviewPageActions.initializeAnswerSheet,
  setLoading: customerReviewPageActions.setLoading,
  setQuestions: customerReviewPageActions.setQuestions,
  setError: notificationActions.setError,
  setSuccess: notificationActions.setSuccess
}

const ConnectedCustomerReviewPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerReviewPage)
export default withRouter(ConnectedCustomerReviewPage)
