import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import './LandingPage.css'

import registrationService from '../services/registration'

import notificationActions from '../reducers/actions/notificationActions'
import registrationActions from '../reducers/actions/registrationActions'

class LandingPage extends React.Component {
  componentDidMount() {
    this.fetchOwnRegistration()
  }

  fetchOwnRegistration = async () => {
    const response = await registrationService.getOwn()
    if (response) {
      this.props.setRegistration(response)
    } else {
      this.props.clearRegistration()
    }
  }

  render() {
    return (
      <div className="landingpage-container">
        <h2 className="landingpage-header">Home</h2>
        {this.props.projectOpen ? (
          this.props.ownRegistration ? (
            <div>You are already registered</div>
          ) : (
            <Link to={process.env.PUBLIC_URL + '/register'}>
              Submit your registration
            </Link>
          )
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
  ...registrationActions
}

const ConnectedLandingPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)

export default withRouter(ConnectedLandingPage)
