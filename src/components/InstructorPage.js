import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

//Services
import groupManagementService from '../services/groupManagement'
import peerReviewService from '../services/peerReview'

const GroupsInstructed = ({ myGroups }) => {
  return myGroups.map((myGroup, index) => {
    return <GroupDetails key={index} myGroup={myGroup} />
  })
}

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
        <h2>{myGroup.groupName}</h2>
        {myGroup.students.map((member, index) => {
          return (
            <p>
              {index + 1}. {member.first_names} {member.last_name}
            </p>
          )
        })}
      </div>
    )
  }
}

const PeerReviewsGroups = ({ answersJson }) => {
  return JSON.stringify(answersJson, null, 2)
}

class InstructorPage extends React.Component {
  state = { myGroups: null, answersJson: null }

  async componentDidMount() {
    const myGroups = await groupManagementService.getByInstructor()
    const peerReviewData = await peerReviewService.getAnswersByInstructor()

    this.setState({
      myGroups: myGroups,
      answersJson: peerReviewData
    })
  }

  render() {
    const { myGroups, answersJson } = this.state
    if (myGroups) {
      return (
        <div className="instructor-container">
          <h2>Ohjaat seuraavia ryhmiä: </h2>
          <GroupsInstructed myGroups={myGroups} />
          <PeerReviewsGroups answersJson={answersJson} />
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
}

const mapStateToProps = (state) => {
  return {
    myGroups: state.myGroups,
    answersJson: state.peerReviewData
  }
}

const ConnectedInstructorPage = connect(mapStateToProps)(InstructorPage)

// mapDispatchToProps

export default withRouter(ConnectedInstructorPage)
