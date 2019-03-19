import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactDragList from 'react-drag-list'

import registrationActions from '../reducers/actions/registrationActions'
import myGroupActions from '../reducers/actions/myGroupActions'

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

class CourseMaterial extends React.Component {
  render() {
    return (
      <div>
        <h2>Course material</h2>
        <a href="https://github.com/HY-TKTL/TKT20007-Ohjelmistotuotantoprojekti">
          Course page
        </a>
      </div>
    )
  }
}

class PeerReviewInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { submittedReviews: [] }
  }

  async componentDidMount() {
    const data = await peerReviewService.get()
    if (data) {
      this.setState({
        submittedReviews: data
      })
    }
  }

  render() {
    const { submittedReviews } = this.state
    const { peerReviewOpen, peerReviewRound, groupDetails } = this.props

    return (
      <div>
        {(peerReviewOpen || submittedReviews.length > 0) && groupDetails ? (
          <div>
            <h2>Peer reviews</h2>
            {submittedReviews.length > 0 && (
              <div>
                {submittedReviews.map((review, index) => {
                  return (
                    <Typography variant="body1" gutterBottom key={index}>
                      Peer review {review.review_round} submission date:{' '}
                      {formatDate(review.createdAt)}
                    </Typography>
                  )
                })}
              </div>
            )}
            {peerReviewOpen && peerReviewRound > submittedReviews.length && (
              <div>
                <Link to="/peerreview" data-cy="peerreviewlink">
                  Click here to submit peer review {peerReviewRound}
                </Link>
              </div>
            )}
          </div>
        ) : null}
      </div>
    )
  }
}

const extractCallingName = (firstNames) => {
  if (firstNames.includes('*')) {
    return firstNames.split('*')[1].split(' ')[0]
  }
  return firstNames.split(' ')[0]
}

const UserDetails = ({ student }) => {
  const { first_names, last_name, student_number, email } = student

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
  const leftPad = (string) => {
    const pad = '  '
    return pad.concat(string)
  }

  return (
    <div>
      <h2>Group</h2>
      {groupDetails ? (
        <div>
          <h4>Name</h4>
          <Typography variant="body1" gutterBottom>
            {groupDetails.groupName}
          </Typography>
          <h4>Instructor</h4>
          <Typography variant="body1" gutterBottom>
            {groupDetails.instructor}
          </Typography>
          <h4>Members</h4>
          {groupDetails.students.map((member) => {
            return (
              <Typography variant="body1">
                {extractCallingName(member.first_names)} {member.last_name}
              </Typography>
            )
          })}
        </div>
      ) : (
        <Typography variant="body1" gutterBottom>
          not assigned yet
        </Typography>
      )}
    </div>
  )
}

class RegistrationDetailsPage extends React.Component {
  async componentDidMount() {
    await this.props.initializeMyGroup()
  }

  render() {
    const { groupDetails } = this.props
    const {
      student,
      preferred_topics,
      questions,
      createdAt
    } = this.props.ownRegistration
    const { peerReviewOpen, peerReviewRound } = this.props

    return (
      <div className="registration-details-container">
        <Typography variant="h4" gutterBottom>
          Registration details
        </Typography>
        <Typography variant="body1" gutterBottom>
          Registration date: {formatDate(createdAt)}
        </Typography>
        <CourseMaterial />
        <PeerReviewInfo
          peerReviewOpen={peerReviewOpen}
          peerReviewRound={peerReviewRound}
          groupDetails={groupDetails}
        />
        <GroupDetails groupDetails={groupDetails} />
        <UserDetails student={student} />
        <PreferredTopics topics={preferred_topics} />
        <RegistrationAnswers questions={questions} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ownRegistration: state.registration,
    peerReviewOpen: state.registrationManagement.peerReviewOpen,
    groupDetails: state.registrationDetails.myGroup,
    peerReviewRound: state.registrationManagement.peerReviewRound
  }
}

const mapDispatchToProps = {
  fetchRegistration: registrationActions.fetchRegistration,
  initializeMyGroup: myGroupActions.initializeMyGroup
}

const ConnectedRegistrationDetailsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationDetailsPage)

export default withRouter(ConnectedRegistrationDetailsPage)
