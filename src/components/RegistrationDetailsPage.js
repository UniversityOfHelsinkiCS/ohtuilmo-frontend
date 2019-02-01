import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import registrationActions from '../reducers/actions/registrationActions'

class RegistrationDetailsPage extends React.Component {
  render() {
    return (
      <div>
        <p>Here are the registration details someday...</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ownRegistration: state.registration
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
