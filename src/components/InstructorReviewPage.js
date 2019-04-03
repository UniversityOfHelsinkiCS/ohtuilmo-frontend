import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import './InstructorReviewPage.css'

//Services

class InstructorReviewPage extends React.Component {
  render() {
    return <div>Moi</div>
  }
}

const ConnectedInstructorReviewPage = connect(null)(InstructorReviewPage)

export default withRouter(ConnectedInstructorReviewPage)
