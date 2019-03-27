import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './InstructorPage.css'

//Services
import peerReviewService from '../services/peerReview'

//Actions
import instructorPageActions from '../reducers/actions/instructorPageActions'

const GroupDetails = ({ myGroup }) => {
  if (!myGroup) {
    return (
      <div>
        <h2>This user is currently not part of any group.</h2>
      </div>
    )
  } else {
    return (
      <div>
        {myGroup.map((member, index) => {
          return (
            <p key={index}>
              {index + 1}. {member}
            </p>
          )
        })}
      </div>
    )
  }
}

const Answers = ({ answers }) => {
  if (answers) {
    return (
      <div>
        {answers.map((projectGroup, index) => {
          return (
            <div key={index}>
              <hr />
              <br />
              <h1>{projectGroup.group.name}</h1>
              <h3>Ohjaaja: {projectGroup.group.instructorName}</h3>
              <GroupDetails myGroup={projectGroup.group.studentNames} />
              <GroupAnswers answers={projectGroup.round1Answers} />
              <br />
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

const GroupAnswers = ({ answers }) => {
  console.log('group answers', answers)
  return (
    <div>
      <h2>Vastaukset</h2>
      {answers[0].answer_sheet.map((question, index) => {
        if (question.type === 'text' || question.type === 'number') {
          return (
            <div key={index}>
              <h3>{question.questionHeader}</h3>
              <TextNumberAnswer answers={answers} questionNumber={index} />
            </div>
          )
        } else if (question.type === 'radio') {
          return (
            <div key={index}>
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
  return answers.map((member, index) => {
    return (
      <p key={index}>
        {member.student.last_name}
        <br /> {member.answer_sheet[questionNumber].answer}
      </p>
    )
  })
}

const RadioAnswer = ({ answers, questionNumber }) => {
  const peers = answers.map((member) => {
    return member.student.last_name
  })
  return (
    <div>
      <table className="radio-button-table">
        <thead>
          <tr className="radio-row">
            <th />
            <PeerHeaders peers={peers} />
          </tr>
        </thead>
        <tbody>
          {answers.map((member, index) => {
            return (
              <tr key={index}>
                <th className="peer-header">{member.student.last_name}</th>

                {Object.entries(member.answer_sheet[questionNumber].peers).map(
                  ([nimi, numero]) => {
                    return (
                      <th className="radio-button" key={nimi}>
                        {numero}
                      </th>
                    )
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
      <th className="radio-header" key={optionId}>
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
    console.log('json: ', answersJson)
    if (answersJson) {
      return (
        <div className="instructor-container">
          <Answers answers={answersJson} />
        </div>
      )
    } else {
      return <div>Loading</div>
    }
  }
}
const mapDispatchToProps = {
  ...instructorPageActions
}

const mapStateToProps = (state) => {
  return {
    configurations: state.instructorPage.configurations,
    currentConfiguration: state.instructorPage.currentConfiguration
  }
}

const ConnectedInstructorPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(InstructorPage)

export default withRouter(ConnectedInstructorPage)
