import React from 'react'
import { connect } from 'react-redux'
import appActions from '../reducers/actions/appActions'
import notificationActions from '../reducers/actions/notificationActions'
import registrationManagementActions from '../reducers/actions/registrationManagementActions'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
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

  saveOptions = async (event) => {
    event.preventDefault()
    this.props.updateIsLoading(true)
    let registrationOpen = this.props.registrationOpen
    let registrationMessage = this.props.registrationMessage
    let topicOpen = this.props.topicOpen
    let topicMessage = this.props.topicMessage

    try {
      await registrationManagementService.create({
        registrationManagement: {
          project_registration_open: registrationOpen,
          project_registration_message: registrationMessage,
          topic_registration_open: topicOpen,
          topic_registration_message: topicMessage
        }
      })
      this.props.setSuccess('Saving configuration succesful!')
      this.props.updateIsLoading(false)
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
    } catch (e) {
      console.log('error happened', e)
      this.props.updateIsLoading(false)

      if (e.response.status === 400) {
        this.props.setError('Message cant be empty if registration is closed')
      }

      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
    }
  }

  render() {
    return (
      <div className="registrationManagement-container">
        <h1 className="registrationManagement-header">
          Registration Management
        </h1>
        <form onSubmit={this.saveOptions}>
          <p className="registrationManagement-information">
            Change registration status and messages.
          </p>
          <p>
            Open registration: :
            <Switch
              checked={this.props.registrationOpen}
              className="projectRegistrationSwitch"
              onChange={() =>
                this.props.updateProjectRegistrationOpen(
                  !this.props.registrationOpen
                )
              }
            />
          </p>
          <textarea
            label="viesti"
            value={this.props.registrationMessage}
            className="projectRegistrationMessage"
            onChange={(e) =>
              this.props.updateProjectRegistrationMessage(e.target.value)
            }
          />
          <br />

          <Button
            className="registrationManagementSubmit-button"
            style={{ marginTop: '30px' }}
            variant="outlined"
            color="default"
            type="submit"
          >
            Save Options
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    registrationOpen: state.registrationManagement.projectRegistrationOpen,
    registrationMessage:
      state.registrationManagement.projectRegistrationMessage,
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
