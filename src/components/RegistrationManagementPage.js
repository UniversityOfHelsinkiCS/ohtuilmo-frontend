import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
// MUI
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
// Actions
import appActions from '../reducers/actions/appActions'
import * as notificationActions from '../reducers/actions/notificationActions'
import registrationManagementActions from '../reducers/actions/registrationManagementActions'
// Services
import registrationManagementService from '../services/registrationManagement'

class RegistrationManagement extends React.Component {
  componentWillMount() {
    try {
      if (window.localStorage.getItem('loggedInUser') === null) {
        this.props.history.push('/')
      } else {
        const token = JSON.parse(window.localStorage.getItem('loggedInUser'))
        if (!token.user.admin || token === undefined || token === null) {
          this.props.history.push('/')
        }
      }
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Some error happened', 5000)
    }
  }

  saveConfiguration = async (event) => {
    event.preventDefault()

    const {
      projectOpen,
      projectMessage,
      topicOpen,
      topicMessage,
      projectInfo,
      updateIsLoading,
      setSuccess,
      setError
    } = this.props

    updateIsLoading(true)

    try {
      await registrationManagementService.create({
        registrationManagement: {
          project_registration_open: projectOpen,
          project_registration_message: projectMessage,
          project_registration_info: projectInfo,
          topic_registration_open: topicOpen,
          topic_registration_message: topicMessage
        }
      })
      setSuccess('Saving configuration succesful!', 3000)
      updateIsLoading(false)
    } catch (e) {
      console.log('error happened', e.response)
      updateIsLoading(false)
      if (e.response.status === 400) {
        setError(e.response.data.error, 3000)
      }
    }
  }

  render() {
    const {
      projectOpen,
      projectMessage,
      topicOpen,
      topicMessage,
      projectInfo,
      updateProjectRegistrationOpen,
      updateProjectRegistrationMessage,
      updateProjectRegistrationInfo,
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
            label="Registration status message"
            margin="normal"
            value={projectMessage}
            onChange={(e) => updateProjectRegistrationMessage(e.target.value)}
            required={!projectOpen}
          />
          <TextField
            fullWidth
            label="Registration page info message"
            margin="normal"
            value={projectInfo}
            onChange={(e) => updateProjectRegistrationInfo(e.target.value)}
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
            label="Registration status message"
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
    projectInfo: state.registrationManagement.projectRegistrationInfo,
    topicOpen: state.registrationManagement.topicRegistrationOpen,
    topicMessage: state.registrationManagement.topicRegistrationMessage,
    isLoading: state.app.isLoading
  }
}

const mapDispatchToProps = {
  ...registrationManagementActions,
  ...appActions,
  setError: notificationActions.setError,
  setSuccess: notificationActions.setSuccess
}

const ConnectedRegistrationManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationManagement)

export default withRouter(ConnectedRegistrationManagement)
