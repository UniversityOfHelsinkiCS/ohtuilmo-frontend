import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

// MUI
import {
  FormControlLabel,
  Select,
  MenuItem,
  CardContent,
  Card,
  TextField,
  Switch,
  Button,
  FormControl,
  FormHelperText
} from '@material-ui/core'

// Actions
import appActions from '../reducers/actions/appActions'
import * as notificationActions from '../reducers/actions/notificationActions'
import registrationManagementActions from '../reducers/actions/registrationManagementActions'
import adminPageActions from '../reducers/actions/adminPageActions'

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

  async componentDidMount() {
    if (this.props.configurations.length === 0) {
      await this.props.fetchConfigurations()
    }
  }

  saveConfiguration = async (event) => {
    event.preventDefault()

    const {
      peerReviewConf,
      peerReviewOpen,
      peerReviewRound,
      projectConf,
      projectOpen,
      projectMessage,
      topicConf,
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
          peer_review_conf: peerReviewConf,
          peer_review_open: peerReviewOpen,
          peer_review_round: peerReviewRound,
          project_registration_conf: projectConf,
          project_registration_open: projectOpen,
          project_registration_message: projectMessage,
          project_registration_info: projectInfo,
          topic_registration_conf: topicConf,
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
      peerReviewConf,
      peerReviewOpen,
      peerReviewRound,
      projectConf,
      projectOpen,
      projectInfo,
      projectMessage,
      topicConf,
      topicOpen,
      topicMessage,
      updatePeerReviewConf,
      updatePeerReviewOpen,
      updatePeerReviewRound,
      updateProjectRegistrationConf,
      updateProjectRegistrationOpen,
      updateProjectRegistrationMessage,
      updateProjectRegistrationInfo,
      updateTopicRegistrationConf,
      updateTopicRegistrationOpen,
      updateTopicRegistrationMessage
    } = this.props

    const cardStyle = {
      marginBottom: '10px'
    }

    const configurationMenuItems = () => {
      const { configurations } = this.props
      return []
        .concat(
          <MenuItem value={-1} key={-1} disabled>
            <em>Pick one</em>
          </MenuItem>
        )
        .concat(
          configurations.map((configuration) => (
            <MenuItem value={configuration.id} key={configuration.id}>
              {configuration.name}
            </MenuItem>
          ))
        )
    }

    return (
      <div className="registrationManagement-container">
        <h3>Registration and review management</h3>
        <form
          className="registration-management-form"
          onSubmit={this.saveConfiguration}
        >
          <p>Control state of registrations and reviews</p>

          <Card style={cardStyle}>
            <CardContent>
              <h4>Project registration</h4>
              <FormControlLabel
                control={
                  <Switch
                    checked={projectOpen}
                    onChange={() => updateProjectRegistrationOpen(!projectOpen)}
                  />
                }
                label="Project registration open"
              />
              <p />
              <FormControl>
                <Select
                  value={projectConf ? projectConf : -1}
                  onChange={(event) => {
                    updateProjectRegistrationConf(event.target.value)
                  }}
                >
                  {configurationMenuItems()}
                </Select>
                <FormHelperText>
                  Active configuration for project registration
                </FormHelperText>
              </FormControl>

              <TextField
                fullWidth
                label="Registration status message"
                margin="normal"
                value={projectMessage}
                onChange={(e) =>
                  updateProjectRegistrationMessage(e.target.value)
                }
                required={!projectOpen}
              />
              <TextField
                fullWidth
                label="Registration page info message"
                margin="normal"
                value={projectInfo}
                onChange={(e) => updateProjectRegistrationInfo(e.target.value)}
              />
            </CardContent>
          </Card>

          <Card style={cardStyle}>
            <CardContent>
              <h4>Topic registration</h4>
              <FormControlLabel
                control={
                  <Switch
                    checked={topicOpen}
                    onChange={() => updateTopicRegistrationOpen(!topicOpen)}
                  />
                }
                label="Topic registration open"
              />
              <p />
              <FormControl>
                <Select
                  value={topicConf ? topicConf : -1}
                  onChange={(event) => {
                    updateTopicRegistrationConf(event.target.value)
                  }}
                >
                  {configurationMenuItems()}
                </Select>
                <FormHelperText>
                  Active configuration for topic registration
                </FormHelperText>
              </FormControl>
              <TextField
                fullWidth
                label="Registration status message"
                margin="normal"
                value={topicMessage}
                onChange={(e) => updateTopicRegistrationMessage(e.target.value)}
                required={!topicOpen}
              />
            </CardContent>
          </Card>

          <Card style={cardStyle}>
            <CardContent>
              <h4>Peer review</h4>
              <FormControlLabel
                control={
                  <Switch
                    checked={peerReviewOpen}
                    onChange={() => updatePeerReviewOpen(!peerReviewOpen)}
                  />
                }
                label="Peer review open"
                data-cy="peer-review-open-switch"
              />
              <p />
              <FormControl>
                <Select
                  value={peerReviewConf ? peerReviewConf : -1}
                  onChange={(event) => {
                    updatePeerReviewConf(event.target.value)
                  }}
                >
                  {configurationMenuItems()}
                </Select>
                <FormHelperText>
                  Active configuration for peer review
                </FormHelperText>
              </FormControl>
              <p />
              <FormControl>
                <Select
                  value={peerReviewRound ? peerReviewRound : -1}
                  onChange={(event) => {
                    updatePeerReviewRound(event.target.value)
                  }}
                >
                  <MenuItem value={-1} disabled>
                    <em>Pick one</em>
                  </MenuItem>
                  <MenuItem value={1}>Review round 1</MenuItem>
                  <MenuItem value={2}>Review round 2</MenuItem>
                </Select>
                <FormHelperText>Select review round</FormHelperText>
              </FormControl>
            </CardContent>
          </Card>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            data-cy="save-configuration-submit"
          >
            Save Configuration
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    peerReviewConf: state.registrationManagement.peerReviewConf,
    peerReviewOpen: state.registrationManagement.peerReviewOpen,
    peerReviewRound: state.registrationManagement.peerReviewRound,
    projectConf: state.registrationManagement.projectRegistrationConf,
    projectOpen: state.registrationManagement.projectRegistrationOpen,
    projectMessage: state.registrationManagement.projectRegistrationMessage,
    projectInfo: state.registrationManagement.projectRegistrationInfo,
    topicConf: state.registrationManagement.topicRegistrationConf,
    topicOpen: state.registrationManagement.topicRegistrationOpen,
    topicMessage: state.registrationManagement.topicRegistrationMessage,
    isLoading: state.app.isLoading,
    configurations: state.adminPage.configurations
  }
}

const mapDispatchToProps = {
  ...registrationManagementActions,
  ...appActions,
  setError: notificationActions.setError,
  setSuccess: notificationActions.setSuccess,
  fetchConfigurations: adminPageActions.fetchConfigurations
}

const ConnectedRegistrationManagement = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationManagement)

export default withRouter(ConnectedRegistrationManagement)
