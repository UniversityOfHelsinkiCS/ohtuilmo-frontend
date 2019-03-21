import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

//Services
import peerReviewService from '../services/peerReview'

const GroupDetails = (myGroup) => {
  if (!myGroup) {
    return (
      <div>
        <h2>This user is currently not part of any group.</h2>
      </div>
    )
  } else {
    return (
      <div>
        {myGroup.group.map((member, index) => {
          return (
            <p key={index}>
              {index + 1}. {member.student.first_names}
              {member.student.last_name}
            </p>
          )
        })}
      </div>
    )
  }
}

const Answers = (answers) => {
  if (answers) {
    return (
      <div>
        <h2>Groups</h2>

        {answers.answersJson.map((group, index) => {
          return (
            <div key={index}>
              <h3>{group.group.name}</h3>
              <GroupDetails group={group.round1Answers} />
              <GroupAnswers group={group.round1Answers} />
            </div>
          )
        })}
      </div>
    )
  } else {
    return (
      <div>
        <p>Loading</p>
      </div>
    )
  }
}

const GroupAnswers = (answers) => {
  return (
    <div>
      <h2>Vastaukset</h2>
      {answers.group[0].answer_sheet.map((question, index) => {
        if (question.type === 'text' || question.type === 'number') {
          return (
            <div>
              <h3>{question.questionHeader}</h3>
              <TextNumberAnswer answers={answers} questionNumber={index} />
            </div>
          )
        } else if (question.type === 'radio') {
          return (
            <div>
              <h3>{question.questionHeader}</h3>
              <RadioAnswer answers={answers} questionNumber={index} />
            </div>
          )
        }
      })}
    </div>
  )
}

const TextNumberAnswer = ({ answers, questionNumber }) => {
  return answers.group.map((member) => {
    return (
      <p>
        {member.student.last_name}
        <br /> {member.answer_sheet[questionNumber].answer}
      </p>
    )
  })
}

const RadioAnswer = ({ answers, questionNumber }) => {
  const peers = answers.group.map((member) => {
    return member.student.last_name
  })
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th />
            <PeerHeaders peers={peers} />
          </tr>
        </thead>
        <tbody>
          {answers.group.map((member, index) => {
            return (
              <tr key={index}>
                {member.student.last_name}

                {Object.entries(member.answer_sheet[questionNumber].peers).map(
                  ([nimi, numero]) => {
                    return <th key={nimi}>{numero}</th>
                  }
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
const PeerHeaders = ({ peers }) => {
  return peers.map((option, optionId) => {
    return (
      <th className="peer-review-box__radio-header" key={optionId}>
        {option}
      </th>
    )
  })
}

class InstructorPage extends React.Component {
  state = { answersJson: null }

  async componentDidMount() {
    const peerReviewData = await peerReviewService.getAnswersByInstructor()

    this.setState({
      answersJson: peerReviewData
    })
  }

  render() {
    const { answersJson } = this.state
    console.log(answersJson)
    if (answersJson) {
      return (
        <div className="instructor-container">
          <h2>Sivu on testauksessa</h2>
          <Answers answersJson={answersJson.answers} />
          {/*         <GlobalStatistics />
           */}
        </div>
      )
    } else {
      return <div>Loading</div>
    }
  }
}

const mapStateToProps = () => {
  return {}
}

const ConnectedInstructorPage = connect(mapStateToProps)(InstructorPage)

// mapDispatchToProps

export default withRouter(ConnectedInstructorPage)
