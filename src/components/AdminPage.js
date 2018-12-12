import React from 'react'
import { connect } from 'react-redux'
import './TopicFormPage.css'
// MUI
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
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
      }, 3000)
    }
  }

  componentDidMount() {
    this.fetchConfigurations()
  }

  fetchConfigurations = async () => {
    try {
      const response = await configurationService.getAll()
      this.props.setConfigurations(response.configurations)
      this.props.updateSelected(this.props.configurations[0])
      this.props.updateConfigForm(this.props.selected)
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Error fetching configurations')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
    }
  }

  handleConfigurationChange = (event) => {
    this.props.updateSelected(event.target.value)
  }

  render() {
    return (
      <div className="admin-page-container">
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
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    configurations: state.adminPage.configurations,
    selected: state.adminPage.selected,
    form: state.adminPage.form
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
