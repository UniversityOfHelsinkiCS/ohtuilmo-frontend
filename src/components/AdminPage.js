import React from 'react'
import { connect } from 'react-redux'
import './TopicFormPage.css'
// MUI
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
// Service
import configurationService from '../services/configuration'
// Actions
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
      }, 5000)
    }
  }

  componentDidMount() {
    this.fetchConfigurations()
  }

  fetchConfigurations = async () => {
    try {
      const response = await configurationService.getAll()
      this.props.setConfigurations(response.configurations)
      if (this.props.configurations.length > 0) {
        const selected = this.props.configurations.find(
          (c) => c.active === true
        )
        this.props.updateSelected(selected)
        this.props.updateConfigForm(this.props.selected)
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

  handleConfigurationChange = (event) => {
    if (event.target.value === 'new') {
      this.props.selectNewConfig()
      this.props.updateNewStatus(true)
    } else {
      this.props.updateSelected(event.target.value)
      this.props.updateConfigForm(event.target.value)
      this.props.updateNewStatus(false)
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
      this.props.updateSelected(response.configuration)
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
      const response = await configurationService.update(configuration)
      this.props.updateConfigurations(response.configuration)
      this.props.updateSelected(response.configuration)
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
        <form
          onSubmit={this.props.isNew ? this.saveNewConfig : this.updateConfig}
        >
          <h3>Change configuration</h3>
          <Select
            value={this.props.selected ? this.props.selected : 'new'}
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
              required
              margin="normal"
              value={this.props.form.name}
              onChange={(e) => this.props.updateConfigName(e.target.value)}
            />
          </div>
          <h3>Questions</h3>
          <h3>Customer emails</h3>
          <Button type="submit" color="primary" variant="contained">
            Save
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    configurations: state.adminPage.configurations,
    selected: state.adminPage.selected,
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
