import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import './LandingPage.css'

import notificationActions from '../reducers/actions/notificationActions'

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landingpage-container">
        <h2 className="landingpage-header">Home</h2>
        {this.props.projectOpen ? (
          <Link to={process.env.PUBLIC_URL + '/register'}>
            Submit your registration
          </Link>
        ) : (
          <div className="landingpage-message">{this.props.projectMessage}</div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projectOpen: state.registrationManagement.projectRegistrationOpen,
    projectMessage: state.registrationManagement.projectRegistrationMessage
  }
}

const mapDispatchToProps = {
  ...notificationActions
}

const ConnectedLandingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)

export default ConnectedLandingPage
