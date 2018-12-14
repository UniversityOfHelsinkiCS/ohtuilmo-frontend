import React from 'react'
import './LandingPage.css'

class LandingPage extends React.Component {

  render() {
    return (
      <div className="landingpage-container">
        <h2 className="landingpage-header">Home</h2>
        <a href={process.env.PUBLIC_URL + '/register'}>Submit your registration</a>
      </div>
    )
  }
}

export default LandingPage