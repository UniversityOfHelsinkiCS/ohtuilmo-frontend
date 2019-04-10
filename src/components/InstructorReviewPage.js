import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getUser } from '../utils/functions'

import './InstructorReviewPage.css'
import questionsJson from './questions/instructor_data'
//Actions
import appActions from '../reducers/actions/appActions'
import * as notificationActions from '../reducers/actions/notificationActions'
import instructorReviewPageActions from '../reducers/actions/instructorReviewPageActions.js'
//import groupManagement from '../services/groupManagement'

//Services
import TextField from '@material-ui/core/TextField'

import groupManagementService from '../services/groupManagement'
import Button from '@material-ui/core/Button'
import instructorReviewService from '../services/instructorReview'

class InstructorReviewPage extends React.Component {
  componentWillMount() {
    try {
      if (window.localStorage.getItem('loggedInUser') === null) {
        this.props.history.push('/')
      }
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Some error happened')
    }
  }
  async componentDidMount() {
    try {
      const group = await groupManagementService.getByInstructor()
      if (group) {
        this.fetchInstructorReviewQuestions(group[0].students, questionsJson)
        const hasAnswered = await instructorReviewService.get()
        if (hasAnswered.length > 0) {
          console.log('set submitted true')
          this.props.setSubmittedReview(true)
        }
      } else {
        this.props.setLoading(false)
      }
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Database error')
    }
  }

  async fetchInstructorReviewQuestions(students, questions) {
    const initializeNumberAnswer = (question, questionId) => {
      return {
        type: 'number',
        header: question.header,
        id: questionId,
        answer: 0
      }
    }

    const initializeTextAnswer = (question, questionId) => {
      return {
        type: 'text',
        header: question.header,
        id: questionId,
        answer: ''
      }
    }
    const emptyAnswerSheet = questions.questions.map((question, questionID) => {
      if (question.type === 'text') {
        return initializeTextAnswer(question, questionID)
      } else if (question.type === 'number') {
        return initializeNumberAnswer(question, questionID)
      } else {
        return question
      }
    })

    const initializeStudent = (name) => {
      const sheet = emptyAnswerSheet
      return {
        name: name,
        answers: sheet
      }
    }
    const tempAnswerSheet = students.map((student) => {
      return initializeStudent(student)
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
      await instructorReviewService.create({
        instructorReview: {
          answer_sheet: answerSheet,
          user_id: getUser().student_number
        }
      })

      this.props.setSuccess('Instructor review saved!')
      this.props.history.push('/')
    } catch (e) {
      // console.log('error happened', e)
      // this.props.setError(e.response.data.error)
    }
  }
  render() {
    const { answerSheet, updateAnswer, submittedReview } = this.props
    console.log('Vastaus:', submittedReview)
    if (submittedReview === true) {
      return (
        <div>
          <h3>Review sent.</h3>
        </div>
      )
    } else if (answerSheet) {
      return (
        <div>
          <Reviews answerSheet={answerSheet} updateAnswer={updateAnswer} />
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
      )
    } else {
      return (
        <div>
          <p>loading</p>
        </div>
      )
    }
  }
}

const Reviews = ({ answerSheet, updateAnswer }) => {
  return answerSheet.map((student, index) => {
    return (
      <div key={index}>
        <h1 className="student-name">
          {student.name.first_names + ' ' + student.name.last_name}
        </h1>
        <Questions
          studentAnswers={student.answers}
          updateAnswer={updateAnswer}
          userId={index}
        />
      </div>
    )
  })
}

const Questions = ({ studentAnswers, updateAnswer, userId }) => {
  return studentAnswers.map((question, questionId) => {
    if (question.type === 'text') {
      return (
        <div className="peer-review-box">
          <h3 className="peer-review-box__h3">{question.header}</h3>
          <p>{question.description}</p>

          <TextField
            value={question.answer}
            rows="4"
            style={{ width: 400 }}
            multiline
            variant="outlined"
            onChange={(e) =>
              textFieldHandler(e.target.value, userId, questionId, updateAnswer)
            }
          />
        </div>
      )
    } else if (question.type === 'number') {
      return (
        <div className="peer-review-box">
          <h3 className="peer-review-box__h3">{question.header}</h3>
          <p>{question.description}</p>

          <input
            type="number"
            data-cy={`input_number_${question.header}`}
            value={question.answer}
            onChange={(e) =>
              numberFieldHandler(
                e.target.value,
                userId,
                questionId,
                updateAnswer
              )
            }
          />
        </div>
      )
    } else if (question.type === 'info') {
      return (
        <div className="peer-review-box">
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
  })
}
const textFieldHandler = (value, userId, questionId, updateAnswer) => {
  updateAnswer(value, userId, questionId)
}
const numberFieldHandler = (value, userId, questionId, updateAnswer) => {
  updateAnswer(value, userId, questionId)
}

const mapStateToProps = (state) => {
  return {
    answerSheet: state.instructorReviewPage.answerSheet,
    submittedReview: state.instructorReviewPage.submittedReview
  }
}

const mapDispatchToProps = {
  ...instructorReviewPageActions,
  ...notificationActions,
  ...appActions
}
const ConnectedInstructorReviewPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(InstructorReviewPage)

export default withRouter(ConnectedInstructorReviewPage)
