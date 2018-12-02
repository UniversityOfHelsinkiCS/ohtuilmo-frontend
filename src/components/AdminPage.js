import React from 'react'
import { connect } from 'react-redux'
import './TopicFormPage.css'

class AdminPage extends React.Component {
  render() {
    return (
      <div className="admin-page-container">
        <h3>Administration</h3>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    state: state
  }
}

const mapDispatchToProps = {
}

const ConnectedAdminPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage)

export default ConnectedAdminPage
