import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Button from '@material-ui/core/Button'

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
    return member.student.first_names + ' ' + member.student.last_name
  })
  return (
    <div>
      <table className="radio-button-table">
        <thead>
          <tr className="radio-row">
            <th />
            <PeerHeaders peers={peers} />
            <th className="radio-header">Keskiarvo</th>
          </tr>
        </thead>
        <tbody>
          {peers.map((member, index) => {
            return (
              <tr key={index}>
                <th className="peer-header">
                  <p>{member}</p>
                </th>
                <PeerRows
                  member={member}
                  answers={answers}
                  questionNumber={questionNumber}
                  numberOfPeers={peers.length}
                />
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
const PeerRows = ({ member, answers, questionNumber, numberOfPeers }) => {
  let summa = 0
  let counter = 0
  console.log(numberOfPeers)
  return answers.map((answer) => {
    return Object.entries(answer.answer_sheet[questionNumber].peers).map(
      ([nimi, numero]) => {
        if (nimi === member) {
          summa += numero
          counter++
          if (counter === numberOfPeers) {
            return (
              <React.Fragment>
                <th className="radio-button">
                  <p>{numero}</p>
                </th>
                <th className="radio-button">
                  <p>{(summa / numberOfPeers).toFixed(2)}</p>
                </th>
              </React.Fragment>
            )
          }
          return (
            <th className="radio-button">
              <p>{numero}</p>
            </th>
          )
        }
      }
    )
  })
}
const DownloadButton = ({ jsonData, fileName }) => {
  const data = `text/json;charset=utf-8,${encodeURIComponent(jsonData)}`
  const href = `data:${data}`

  return (
    <Button
      component="a"
      href={href}
      download={fileName}
      variant="contained"
      color="primary"
    >
      Download as JSON
    </Button>
  )
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

    if (answersJson) {
      return (
        <div className="instructor-container">
          <DownloadButton
            jsonData={JSON.stringify(answersJson)}
            fileName="peerReviews.json"
          />
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
