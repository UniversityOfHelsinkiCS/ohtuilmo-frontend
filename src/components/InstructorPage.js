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
  console.log('groupAnswers ', answers)

  return (
    <div>
      <h3>Vastaukset</h3>
      {answers.group[0].answer_sheet.map((question, index) => {
        if (question.type === 'text' || question.type === 'number') {
          return (
            <TextNumberAnswer
              answers={answers}
              question={question}
              questionNumber={index}
            />
          )
        } else if (question.type === 'radio') {
          return <RadioAnswer />
        }
      })}
    </div>
  )
}

const TextNumberAnswer = ({ answers, question, questionNumber }) => {
  console.log('q number ', questionNumber)
  console.log('text ', answers.group[0].answer_sheet[1].answer)

  const asd = answers.group.map((member) => {
    return member.answer_sheet[questionNumber].answer
  })
  return (
    <div>
      <p>{question.questionHeader}</p>
      {asd.map((answer, index) => {
        return <p key={index}>{answer}</p>
      })}
    </div>
  )
}

const RadioAnswer = () => {
  return (
    <div>
      <p>Radiokyssäri not yet implemented</p>
    </div>
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
