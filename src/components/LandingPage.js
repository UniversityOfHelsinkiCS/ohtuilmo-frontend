import React from 'react'
import './LandingPage.css'
import RegistrationPage from './RegistrationPage'

class LandingPage extends React.Component {

  render() {
    return (
      <div className="landingpage-container">
        <h2 className="landingpage-header">User details</h2>
        <p>---</p>
        <RegistrationPage />
      </div>
    )
  }
}

export default LandingPage