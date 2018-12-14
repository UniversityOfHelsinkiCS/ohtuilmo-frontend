import React from 'react'
import { connect } from 'react-redux'
import './TopicFormPage.css'
// MUI
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Divider from '@material-ui/core/Divider'
// Service
import configurationService from '../services/configuration'
import registrationQuestionSetService from '../services/registrationQuestionSet'
// Actions
import adminPageActions from '../reducers/actions/adminPageActions'
import notificationActions from '../reducers/actions/notificationActions'
import { ExpansionPanelActions } from '@material-ui/core'

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
      }, 5000)
    }
  }

  componentDidMount() {
    this.fetchConfigurations()
    this.setQuestions()
  }

  fetchConfigurations = async () => {
    try {
      const response = await configurationService.getAll()
      this.props.setConfigurations(response.configurations)
      if (this.props.configurations.length > 0) {
        const selected = this.props.configurations.find(
          (c) => c.active === true
        )
        this.props.updateSelectedConfig(selected)
        this.props.updateConfigForm(this.props.selectedConfig)
        this.props.updateNewStatus(false)
      } else {
        this.props.selectNewConfig()
        this.props.updateNewStatus(true)
      }
    } catch (e) {
      console.log('error happened', e)
      this.props.setError('Error fetching configurations')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 5000)
    }
  }

  setQuestions = async () => {
    try {
      const questions = await registrationQuestionSetService.getAll()
      this.props.setRegistrationQuestions(questions)
    } catch (e) {
      console.log('error happened', e)
      this.props.setError('Error fetching question sets')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 5000)
    }
  }

  handleConfigurationChange = (event) => {
    if (event.target.value === 'new') {
      this.props.selectNewConfig()
      this.props.updateNewStatus(true)
    } else {
      this.props.updateSelectedConfig(event.target.value)
      this.props.updateConfigForm(event.target.value)
      this.props.updateNewStatus(false)
    }
  }

  handleQuestionSetChange = (event) => {
    if (event.target.name === 'registration') {
      this.props.updateSelectedRegistrationQuestions(event.target.value)
    } else if (event.target.value === 'review1') {
      this.props.updateSelectedReviewQuestions1(event.target.value)
    } else if (event.target.value === 'review2') {
      this.props.updateSelectedReviewQuestions2(event.target.value)
    }
  }

  saveNewConfig = async (event) => {
    event.preventDefault()
    const configuration = { ...this.props.form, active: true }
    try {
      const response = await configurationService.create(configuration)
      this.props.setConfigurations([
        ...this.props.configurations,
        response.configuration
      ])
      this.props.updateSelectedConfig(response.configuration)
      this.props.updateNewStatus(false)
      this.props.setSuccess('New configuration saved and set active')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 5000)
    } catch (e) {
      console.log(e)
      this.props.setError('Error saving new configuration')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 5000)
    }
  }

  updateConfig = async (event) => {
    event.preventDefault()
    try {
      const configuration = { ...this.props.form, active: true }
      const response = await configurationService.update(
        configuration,
        this.props.selectedConfig.id
      )
      this.props.updateConfigurations(response.configuration)
      this.props.updateSelectedConfig(response.configuration)
      this.props.updateConfigForm(response.configuration)
      this.props.setSuccess('Configuration updated and set active')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 5000)
    } catch (e) {
      console.log(e)
      this.props.setError('Error saving edits to configuration')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 5000)
    }
  }

  render() {
    return (
      <div className="admin-page-container">
        <h3>Change configuration</h3>
        <Select
          value={this.props.selectedConfig ? this.props.selectedConfig : 'new'}
          onChange={this.handleConfigurationChange}
        >
          {this.props.configurations.map((item) => (
            <MenuItem key={item.id} value={item}>
              {item.name}
            </MenuItem>
          ))}
          <MenuItem value="new">New</MenuItem>
        </Select>
        <div>
          <TextField
            label="Nimi"
            required
            margin="normal"
            value={this.props.form.name}
            onChange={(e) => this.props.updateConfigName(e.target.value)}
          />
        </div>
        <h3>Questions</h3>
        <div>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <p>Registration questions</p>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Divider />
                {this.props.selectedRegister &&
                  this.props.selectedRegister.questions.map(
                    (questionItem, index) => (
                      <div key={index}>
                        <p>Question: {questionItem.question}</p>
                        <p>Type: {questionItem.type}</p>
                        <Divider />
                      </div>
                    )
                  )}
              </div>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Select
                name="registration"
                value={
                  this.props.selectedRegister
                    ? this.props.selectedRegister
                    : 'default'
                }
                onChange={this.handleQuestionSetChange}
              >
                <MenuItem value="default" disabled>
                  Pick registration questions
                </MenuItem>
                {this.props.allRegistrationQuestions.map((item) => (
                  <MenuItem key={item.id} value={item}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <Button
                style={{ marginRight: '10px', height: '40px' }}
                color="primary"
                variant="contained"
              >
                Configure
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <p>Review questions 1</p>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Divider />
                {this.props.selectedReview1 &&
                  this.props.allReviewQuestions.map((questionItem, index) => (
                    <div key={index}>
                      <p>Question: {questionItem.question}</p>
                      <p>Type: {questionItem.type}</p>
                      <Divider />
                    </div>
                  ))}
              </div>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Select
                name="review1"
                value={
                  this.props.selectedRegister
                    ? this.props.selectedRegister
                    : 'default'
                }
                onChange={this.handleQuestionSetChange}
              >
                <MenuItem value="default" disabled>
                  Pick review 1 questions
                </MenuItem>
                {this.props.allReviewQuestions.map((item) => (
                  <MenuItem key={item.id} value={item}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <Button
                style={{ marginRight: '10px', height: '40px' }}
                color="primary"
                variant="contained"
              >
                Configure
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <p>Review questions 2</p>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Divider />
                {this.props.selectedReview2 &&
                  this.props.allReviewQuestions.map((questionItem, index) => (
                    <div key={index}>
                      <p>Question: {questionItem.question}</p>
                      <p>Type: {questionItem.type}</p>
                      <Divider />
                    </div>
                  ))}
              </div>
            </ExpansionPanelDetails>
            <ExpansionPanelActions>
              <Select
                name="review2"
                value={
                  this.props.selectedRegister
                    ? this.props.selectedRegister
                    : 'default'
                }
                onChange={this.handleQuestionSetChange}
              >
                <MenuItem value="default" disabled>
                  Pick review 2 questions
                </MenuItem>
                {this.props.allReviewQuestions.map((item) => (
                  <MenuItem key={item.id} value={item}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
              <Button
                style={{ marginRight: '10px', height: '40px' }}
                color="primary"
                variant="contained"
              >
                Configure
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        </div>
        <h3>Customer emails</h3>
        <div>
          <TextField
            fullWidth
            label="Hyväksytty (Suomi)"
            type="text"
            margin="normal"
            value=""
            //  onChange={(e) => this.props.updateEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Hylätty (Suomi)"
            type="text"
            margin="normal"
            value=""
            //  onChange={(e) => this.props.updateEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Hyväksytty (Englanti)"
            type="text"
            margin="normal"
            value=""
            //  onChange={(e) => this.props.updateEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="Hylätty (Englanti)"
            type="text"
            margin="normal"
            value=""
            //  onChange={(e) => this.props.updateEmail(e.target.value)}
          />
        </div>
        <Button
          color="primary"
          variant="contained"
          onClick={this.saveNewConfig}
        >
          Save new configuration
        </Button>
        {!this.props.isNew && (
          <Button
            type="submit"
            color="primary"
            variant="contained"
            onClick={this.updateConfig}
          >
            Edit existing configuration
          </Button>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    configurations: state.adminPage.configurations,
    selectedConfig: state.adminPage.selectedConfig,
    allRegistrationQuestions: state.adminPage.allRegistrationQuestions,
    allReviewQuestions: state.adminPage.allReviewQuestions,
    selectedRegister: state.adminPage.selectedRegister,
    selectedReview: state.adminPage.selectedReview,
    form: state.adminPage.form,
    isNew: state.adminPage.isNew
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
