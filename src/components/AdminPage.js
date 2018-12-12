import React from 'react'
import { connect } from 'react-redux'
import './TopicFormPage.css'
import configurationService from '../services/configuration'
import adminPageActions from '../reducers/actions/adminPageActions'
import notificationActions from '../reducers/actions/notificationActions'

class AdminPage extends React.Component {
  componentWillMount() {
    try {
      if (window.localStorage.getItem('loggedInUser') === null) {
        window.location.replace(process.env.PUBLIC_URL + '/')
      } else {
        const token = JSON.parse(window.localStorage.getItem('loggedInUser'))
        if (!token.user.admin || token === undefined || token === null) {
          window.location.replace(process.env.PUBLIC_URL + '/')
        }
      }
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Some error happened')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
    }
  }

  componentDidMount() {
    this.fetchConfigurations()
  }

  fetchConfigurations = async () => {
    try {
      const configurations = await configurationService.getAll()
      this.props.setConfigurations(configurations)
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Error fetching configurations')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
    }
  }

  render() {
    return (
      <div className="admin-page-container">
        <h3>Administration</h3>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    configurations: state.adminPage.configurations
  }
}

const mapDispatchToProps = {
  ...adminPageActions,
  ...notificationActions
}

const ConnectedAdminPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage)

export default ConnectedAdminPage
