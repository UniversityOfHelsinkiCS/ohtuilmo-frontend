import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import './LandingPage.css'

import notificationActions from '../reducers/actions/notificationActions'
import registrationActions from '../reducers/actions/registrationActions'

class LandingPage extends React.Component {
  componentDidMount() {
    this.fetchOwnregistration()
  }

  fetchOwnregistration = async () => {
    await this.props.fetchRegistration()
    if (this.props.ownRegistration) {
      this.props.history.push('/registrationdetails')
    }
  }

  render() {
    return (
      <div className="landingpage-container">
        <h2 className="landingpage-header">Home</h2>
        {this.props.projectOpen ? (
          <Link to="/register">Submit your registration</Link>
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
    projectMessage: state.registrationManagement.projectRegistrationMessage,
    ownRegistration: state.registration
  }
}

const mapDispatchToProps = {
  ...notificationActions,
  fetchRegistration: registrationActions.fetchRegistration
}

const ConnectedLandingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)

export default withRouter(ConnectedLandingPage)
