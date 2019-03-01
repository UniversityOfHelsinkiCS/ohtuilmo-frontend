import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './PeerReviewPage.css'
import { getUser } from '../utils/functions'

// Actions
import appActions from '../reducers/actions/appActions'
import * as notificationActions from '../reducers/actions/notificationActions'
import peerReviewPageActions from '../reducers/actions/peerReviewPageActions.js'
// Services
import peerReviewService from '../services/peerReview'
import groupManagementService from '../services/groupManagement'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class PeerReview extends React.Component {
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
      const group = await groupManagementService.getByStudent()
      if (group) {
        if (group.id !== -100) {
          const reviewQuestionsSet = await peerReviewService.getReviewQuestions(
            group.configurationId,
            this.props.reviewRound
          )

          const questionObject = { questions: reviewQuestionsSet.questions }

          this.props.setQuestions(questionObject)

          this.props.setConfiguration(group.configurationId)

          this.fetchPeerReviewQuestions(group.students, reviewQuestionsSet)
          this.props.createPeers(group.students)
          const answerFound = await peerReviewService.get()
          if (answerFound) {
            this.props.setAnswerFoundTrue(true)
          } else {
            this.props.setAnswerFoundTrue(false)
          }
        } else {
          this.props.setLoading(false)
        }
      }
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Database error')
    }
  }

  async fetchPeerReviewQuestions(peers, questionObject) {
    const initializeRadioAnswer = (question, questionId) => {
      let peerAnswers = {
        type: 'radio',
        id: questionId,
        questionHeader: question.header,
        peers: {}
      }

      peers.forEach(
        (peer) =>
          (peerAnswers.peers[peer.first_names + ' ' + peer.last_name] = null)
      )

      return peerAnswers
    }

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

    const tempAnswerSheet = questionObject.questions.map(
      (question, questionID) => {
        if (question.type === 'radio') {
          return initializeRadioAnswer(question, questionID)
        } else if (question.type === 'text') {
          return initializeTextAnswer(question, questionID)
        } else if (question.type === 'number') {
          return initializeNumberAnswer(question, questionID)
        } else {
          return question
        }
      }
    )

    this.props.initializeAnswerSheet(tempAnswerSheet)
  }

  Submit = async (event, answerSheet, configurationId) => {
    event.preventDefault()

    const answer = window.confirm(
      'Answers can not be changed after submitting. Continue?'
    )
    if (!answer) return
    try {
      await peerReviewService.create({
        peerReview: {
          answer_sheet: answerSheet,
          user_id: getUser().student_number,
          configuration_id: configurationId,
          review_round: this.props.reviewRound
        }
      })
      this.props.setAnswerFoundTrue(true)
      this.props.setSuccess('Peer review saved!')
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError(e.response.data.error)
    }
  }

  render() {
    const {
      answerSheet,
      updateAnswer,
      peers,
      groupsLoading,
      answerFound,
      isInitializing,
      questionObject,
      configurationId,
      reviewOpen
    } = this.props

    if (isInitializing) {
      return (
        <div className="peer-review-container">
          <h1 className="peer-review-container__h1">Loading!</h1>
        </div>
      )
    } else if (!reviewOpen) {
      return (
        <div className="peer-review-container">
          <h1 className="peer-review-container__h1">
            Peer review is not currently open!
          </h1>
        </div>
      )
    } else if (groupsLoading) {
      return (
        <div className="peer-review-container">
          <h1 className="peer-review-container__h1">
            You are not currently assigned to any group!
          </h1>
        </div>
      )
    } else if (answerFound === true) {
      return (
        <div className="peer-review-container">
          <h1 className="peer-review-container__h1">
            Peer review already submitted!
          </h1>
        </div>
      )
    } else {
      console.log(answerSheet)
      return (
        <div className="peer-review-container">
          <h1 className="peer-review-container__h1">Peer Review</h1>
          <Questions
            peers={peers}
            questions={questionObject.questions}
            answerSheet={answerSheet}
            updateAnswer={updateAnswer}
          />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              margin-right="auto"
              margin-left="auto"
              variant="contained"
              color="primary"
              onClick={(event) =>
                this.Submit(event, answerSheet, configurationId)
              }
            >
              Lähetä
            </Button>
          </div>
        </div>
      )
    }
  }
}

const Questions = ({ questions, peers, answerSheet, updateAnswer }) => {
  return (
    <div>
      {questions.map((question, questionId) => {
        return (
          <Question
            key={questionId}
            question={question}
            peers={peers}
            questionId={questionId}
            answerSheet={answerSheet}
            updateAnswer={updateAnswer}
          />
        )
      })}
    </div>
  )
}

const Question = ({
  peers,
  question,
  questionId,
  answerSheet,
  updateAnswer
}) => {
  if (question.type === 'radio') {
    let temp = question.options

    if (question.options === undefined) {
      temp = [0, 1, 2, 3, 4, 5]
    }
    return (
      <div className="peer-review-box">
        <h3 className="peer-review-box__h3">{question.header}</h3>
        <table className="peer-review-box__radio-button-table">
          <thead>
            <tr className="peer-review-box__radio-row">
              <th className="peer-review-box__radio-header" />
              <OptionHeaders options={temp} />
            </tr>
          </thead>
          <tbody>
            <QuestionRows
              peers={peers}
              options={temp}
              questionId={question.header}
              answerSheet={answerSheet[questionId]}
            />
          </tbody>
        </table>
      </div>
    )
  } else if (question.type === 'text') {
    return (
      <div className="peer-review-box">
        <h3 className="peer-review-box__h3">{question.header}</h3>
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
      <div className="peer-review-box">
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
}

const textFieldHandler = (value, questionId, updateAnswer) => {
  updateAnswer(value, questionId)
}

const OptionHeaders = ({ options }) => {
  return options.map((option, optionId) => {
    return (
      <th className="peer-review-box__radio-header" key={optionId}>
        {option}
      </th>
    )
  })
}

const extractCallingName = (firstNames) => {
  if (firstNames.includes('*')) {
    return firstNames.split('*')[1].split(' ')[0]
  }
  return firstNames.split(' ')[0]
}

const QuestionRows = ({ peers, options, questionId, answerSheet }) => (
  <React.Fragment>
    {peers.map((peer, mappiAvain) => (
      <QuestionRow
        key={mappiAvain}
        options={options}
        peerName={extractCallingName(peer.first_names) + ' ' + peer.last_name}
        peerId={peer.first_names + ' ' + peer.last_name}
        questionId={questionId}
        answerSheet={answerSheet}
      />
    ))}
  </React.Fragment>
)

const QuestionRow = ({
  peerName,
  options,
  peerId,
  questionId,
  answerSheet
}) => {
  return (
    <tr className="peer-review-box__peer-row">
      <th className="peer-review-box__peer-header">{peerName}</th>
      {options.map((buttonId, buttonNumber) => {
        return (
          <th className="peer-review-box__radio-button" key={buttonId}>
            <input
              type="radio"
              name={questionId.toString() + peerId.toString()}
              onClick={() =>
                radioSelectHandler(peerId, buttonNumber, answerSheet)
              }
            />
          </th>
        )
      })}
    </tr>
  )
}

const radioSelectHandler = (peerId, buttonId, answerSheet) => {
  updateAnswers(peerId, buttonId, answerSheet)
}

const updateAnswers = (peerId, buttonId, answerSheet) => {
  answerSheet.peers[peerId] = buttonId
}

const mapStateToProps = (state) => {
  return {
    answerSheet: state.peerReviewPage.answerSheet,
    isInitializing: state.peerReviewPage.isInitializing,
    peers: state.peerReviewPage.peers,
    groupsLoading: state.peerReviewPage.groupsLoading,
    answerFound: state.peerReviewPage.answerFound,
    questionObject: state.peerReviewPage.questions,
    configurationId: state.peerReviewPage.configurationId,
    reviewRound: state.registrationManagement.peerReviewRound,
    reviewOpen: state.registrationManagement.peerReviewOpen
  }
}

const mapDispatchToProps = {
  ...peerReviewPageActions,
  ...notificationActions,
  ...appActions
}

const ConnectedPeerReview = connect(
  mapStateToProps,
  mapDispatchToProps
)(PeerReview)
export default withRouter(ConnectedPeerReview)
