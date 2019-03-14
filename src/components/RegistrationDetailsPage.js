import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactDragList from 'react-drag-list'

import registrationActions from '../reducers/actions/registrationActions'

import peerReviewService from '../services/peerReview'
import groupManagementService from '../services/groupManagement'

import Typography from '@material-ui/core/Typography'
import { Input, Card, CardContent, Select, MenuItem } from '@material-ui/core'
import TopicDialog from './TopicDialog'

import './RegistrationDetailsPage.css'

/**
 * Format datetime
 * eg. from 2019-02-07T10:57:19.122Z to 7.2.2019 12.57
 */
const formatDate = (date) => {
  const parsedDate = new Date(date).toLocaleString('fi-FI')
  return parsedDate.slice(0, parsedDate.lastIndexOf('.')).replace('klo', '')
}

const PeerReviewLink = () => (
  <Link to="/peerreview" data-cy="peerreviewlink">
    Click here to submit your peer review
  </Link>
)

const PeerReviewSubmitted = ({ submitDate }) => (
  <span>
    Thank you for answering!
    <br />
    Peer review created at {formatDate(submitDate)}
  </span>
)

class PeerReviewInfo extends React.Component {
  state = { submittedReview: false }

  async componentDidMount() {
    const data = await peerReviewService.get()
    this.setState({
      submittedReview: data
    })
  }

  render() {
    const { submittedReview } = this.state

    return (
      <div>
        <h2>Peer review open</h2>
        <Typography variant="body1" gutterBottom>
          {submittedReview ? (
            <PeerReviewSubmitted submitDate={submittedReview.createdAt} />
          ) : (
            <PeerReviewLink />
          )}
        </Typography>

        <br />
      </div>
    )
  }
}

const UserDetails = ({ student }) => {
  const { first_names, last_name, student_number, email } = student

  const extractCallingName = (firstNames) => {
    if (firstNames.includes('*')) {
      return firstNames.split('*')[1].split(' ')[0]
    }
    return firstNames.split(' ')[0]
  }

  return (
    <div>
      <h2>User details</h2>
      <Typography variant="body1" gutterBottom>
        Name: {extractCallingName(first_names)} {last_name}
        <br />
        Student number: {student_number}
        <br />
        Email: {email}
      </Typography>
    </div>
  )
}

const PreferredTopics = ({ topics }) => {
  return (
    <div>
      <h2>Preferred Topics</h2>
      <div className="dragndrop-container">
        <div className="dragndrop-indexes-container">
          {topics.map((topic, index) => {
            return (
              <Card key={index} className="dragndrop-index">
                {index + 1}
              </Card>
            )
          })}
        </div>
        <ReactDragList
          className="dragndrop-list"
          handles={false}
          dataSource={topics}
          rowKey="id"
          row={(topic) => {
            return <TopicDialog topic={topic} key={topic.content.title} />
          }}
          disabled
        />
      </div>
    </div>
  )
}

const RegistrationAnswers = ({ questions }) => {
  return (
    <div>
      <h2>Answers</h2>
      {questions.map((question, index) => {
        return (
          <Card style={{ marginBottom: '10px' }} key={index}>
            <CardContent>
              <Typography variant="body1">{question.question}</Typography>
              {question.type === 'scale' ? (
                <Select value={question.answer} disabled>
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              ) : (
                <Input
                  value={question.answer}
                  fullWidth
                  multiline
                  rowsMax="3"
                  disabled
                />
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

const GroupDetails = ({ groupDetails }) => {
  if (!groupDetails) {
    return (
      <div>
        <h2>This user is currently not part of any group.</h2>
      </div>
    )
  } else {
    return (
      <div>
        <h2>{groupDetails.groupName}</h2>
        {groupDetails.students.map((member, index) => {
          return (
            <p>
              {index + 1}. {member.first_names} {member.last_name}
            </p>
          )
        })}
        <h3>Ohjaaja</h3>
        <p>{groupDetails.instructor}</p>
      </div>
    )
  }
}

class RegistrationDetailsPage extends React.Component {
  state = { groupDetails: null }

  async componentDidMount() {
    const myGroup = await groupManagementService.getByStudent()
    this.setState({
      groupDetails: myGroup
    })
  }
  render() {
    const { groupDetails } = this.state
    const {
      student,
      preferred_topics,
      questions,
      createdAt
    } = this.props.ownRegistration

    const { peerReviewOpen } = this.props
    return (
      <div className="registration-details-container">
        <Typography variant="h4" gutterBottom>
          Registration details
        </Typography>
        <Typography variant="body1" gutterBottom>
          Registration date: {formatDate(createdAt)}
        </Typography>

        {peerReviewOpen && <PeerReviewInfo />}
        <UserDetails student={student} />
        <PreferredTopics topics={preferred_topics} />
        <RegistrationAnswers questions={questions} />
        <GroupDetails groupDetails={groupDetails} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ownRegistration: state.registration,
    peerReviewOpen: state.registrationManagement.peerReviewOpen,
    groupDetails: state.groupDetails
  }
}

const mapDispatchToProps = {
  fetchRegistration: registrationActions.fetchRegistration
}

const ConnectedRegistrationDetailsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationDetailsPage)

export default withRouter(ConnectedRegistrationDetailsPage)
