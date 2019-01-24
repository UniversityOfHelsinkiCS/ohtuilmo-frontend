import React from 'react'
import { connect } from 'react-redux'

import './LandingPage.css'

import notificationActions from '../reducers/actions/notificationActions'

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landingpage-container">
        <h2 className="landingpage-header">Home</h2>
        {this.props.registrationOpen ? (
          <a href={process.env.PUBLIC_URL + '/register'}>
            Submit your registration
          </a>
        ) : (
          <div className="landingpage-message">
            {this.props.registrationMessage}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    registrationOpen: state.registrationManagement.projectRegistrationOpen,
    registrationMessage: state.registrationManagement.projectRegistrationMessage
  }
}

const mapDispatchToprops = {
  ...notificationActions
}

const ConnectedLandingPage = connect(
  mapStateToProps,
  mapDispatchToprops
)(LandingPage)

export default ConnectedLandingPage
