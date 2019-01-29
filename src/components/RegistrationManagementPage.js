import React from 'react'
import { connect } from 'react-redux'
// MUI
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
// Actions
import appActions from '../reducers/actions/appActions'
import notificationActions from '../reducers/actions/notificationActions'
import registrationManagementActions from '../reducers/actions/registrationManagementActions'
// Services
import registrationManagementService from '../services/registrationManagement'

class RegistrationManagement extends React.Component {
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
      }, 5000)
    }
  }

  saveConfiguration = async (event) => {
    event.preventDefault()

    const {
      projectOpen,
      projectMessage,
      topicOpen,
      topicMessage,
      updateIsLoading,
      setSuccess,
      clearNotifications,
      setError
    } = this.props

    updateIsLoading(true)

    try {
      await registrationManagementService.create({
        registrationManagement: {
          project_registration_open: projectOpen,
          project_registration_message: projectMessage,
          topic_registration_open: topicOpen,
          topic_registration_message: topicMessage
        }
      })
      setSuccess('Saving configuration succesful!')
      updateIsLoading(false)
      setTimeout(() => {
        clearNotifications()
      }, 3000)
    } catch (e) {
      console.log('error happened', e.response)
      updateIsLoading(false)
      if (e.response.status === 400) {
        setError(e.response.data.error)
      }
      setTimeout(() => {
        clearNotifications()
      }, 3000)
    }
  }

  render() {
    const {
      projectOpen,
      projectMessage,
      topicOpen,
      topicMessage,
      updateProjectRegistrationOpen,
      updateProjectRegistrationMessage,
      updateTopicRegistrationOpen,
      updateTopicRegistrationMessage
    } = this.props

    return (
      <div className="registrationManagement-container">
        <h3>Registration management</h3>
        <form
          className="registration-management-form"
          onSubmit={this.saveConfiguration}
        >
          <p>Change registration status and messages</p>
          <h4>Project registration</h4>
          <p>
            Project registration open:
            <Switch
              checked={projectOpen}
              className="projectRegistrationSwitch"
              onChange={() => updateProjectRegistrationOpen(!projectOpen)}
            />
          </p>
          <TextField
            fullWidth
            label="Message / Viesti"
            margin="normal"
            value={projectMessage}
            onChange={(e) => updateProjectRegistrationMessage(e.target.value)}
            required={!projectOpen}
          />
          <h4>Topic registration</h4>
          <p>
            Topic registration open:
            <Switch
              checked={topicOpen}
              className="projectRegistrationSwitch"
              onChange={() => updateTopicRegistrationOpen(!topicOpen)}
            />
          </p>
          <TextField
            fullWidth
            label="Message / Viesti"
            margin="normal"
            value={topicMessage}
            onChange={(e) => updateTopicRegistrationMessage(e.target.value)}
            required={!topicOpen}
          />
          <Button variant="contained" color="primary" type="submit">
            Save Configuration
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projectOpen: state.registrationManagement.projectRegistrationOpen,
    projectMessage: state.registrationManagement.projectRegistrationMessage,
    topicOpen: state.registrationManagement.topicRegistrationOpen,
    topicMessage: state.registrationManagement.topicRegistrationMessage,
    isLoading: state.app.isLoading
  }
}

const mapDispatchToProps = {
  ...registrationManagementActions,
  ...notificationActions,
  ...appActions
}

const ConnectedRegistrationManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationManagement)

export default ConnectedRegistrationManagement
