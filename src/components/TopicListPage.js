import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'
import Divider from '@material-ui/core/Divider'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import green from '@material-ui/core/colors/green'
import red from '@material-ui/core/colors/red'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import topicService from '../services/topic'
import emailService from '../services/email'
import topicListPageActions from '../reducers/actions/topicListPageActions'
import * as notificationActions from '../reducers/actions/notificationActions'
import configurationPageActions from '../reducers/actions/configurationPageActions'

const buttonTheme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red
  }
})

class TopicListPage extends React.Component {
  state = {
    open: false,
    selectedTopic: null,
    selectedMessageType: null
  }

  async componentWillMount() {
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
      this.props.setError('Some error happened', 3000)
    }
  }

  async componentDidMount() {
    try {
      await this.props.fetchTopics()
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('An error occurred while loading data!', 3000)
    }
    if (this.props.configurations.length === 0) {
      await this.props.fetchConfigurations()
    }
  }

  handleActiveChange = (topic) => async (event) => {
    event.preventDefault()
    try {
      topic.active = !topic.active
      const updatedTopics = this.props.topics.map((topic2) => {
        return topic2.id === topic.id ? topic : topic2
      })
      await topicService.update(topic)
      this.props.updateTopics(updatedTopics)
      this.props.setSuccess('Topic update submitted succesfully!', 3000)
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Some error happened', 3000)
    }
  }

  showTopic = (topic) => {
    const filter = this.props.filter
    if (filter !== 0) {
      return topic.configuration_id === filter
    } else {
      return true
    }
  }

  handleEmailButtonPress = (topic, messageType) => async () => {
    this.setState({
      open: true,
      selectedTopic: topic,
      selectedMessageType: messageType
    })
  }

  handleDialogAccept = async () => {
    try {
      await emailService.sendCustomerEmail(
        this.state.selectedTopic.content.email,
        this.state.selectedMessageType
      )
    } catch (e) {
      console.log(e)
    }
    this.handleDialogClose()
  }

  handleDialogClose = () => {
    this.setState({ open: false })
  }

  parseMessageType = (messageType) => {
    switch (messageType) {
    case 'acceptEng':
      return 'Topic accepted (ENG)'
    case 'rejectEng':
      return 'Topic rejected (ENG)'
    case 'acceptFin':
      return 'Topic accepted (FIN)'
    case 'rejectFin':
      return 'Topic rejected (FIN)'
    default:
      return 'unknown message type'
    }
  }

  render() {
    let topicTitle = ''
    let topicOwner = ''
    let parsedMessageType = this.parseMessageType(
      this.state.selectedMessageType
    )
    if (this.state.selectedTopic) {
      topicTitle = this.state.selectedTopic.content.title
      topicOwner = this.state.selectedTopic.content.email
    }

    const configurationMenuItems = () => {
      const { configurations } = this.props
      return []
        .concat(
          <MenuItem value={0} key={0}>
            All configurations
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
      <div className="topics-container">
        <Dialog
          open={this.state.open}
          onClose={this.handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Email confirmation'}
          </DialogTitle>
          <DialogContent>
            <Typography id="alert-dialog-description">
              Do you want to send an email of type '{parsedMessageType}' to the
              owner of topic '{topicTitle}' ({topicOwner})?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialogAccept} color="primary">
              Accept
            </Button>
            <Button onClick={this.handleDialogClose} color="primary" autoFocus>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Select
          value={this.props.filter}
          onChange={(event) => this.props.updateFilter(event.target.value)}
        >
          {configurationMenuItems()}
        </Select>
        <Typography align="right" variant="subtitle1">
          Active
        </Typography>

        {this.props.topics.map((topic) => {
          if (this.showTopic(topic)) {
            return (
              <List key={topic.id}>
                <ListItem>
                  <Link to={'/topics/' + topic.id}>
                    <ListItemText primary={topic.content.title} />
                  </Link>
                  <ListItemText
                    primary={`${topic.content.customerName} (${
                      topic.content.email
                    })`}
                    secondary={`created: ${topic.createdAt}`}
                  />
                  <ListItemSecondaryAction>
                    <MuiThemeProvider theme={buttonTheme}>
                      <Button
                        color="primary"
                        variant="outlined"
                        value="Finnish-Yes"
                        onClick={this.handleEmailButtonPress(
                          topic,
                          'acceptFin'
                        )}
                      >
                        Finnish-Yes
                      </Button>
                      <Button
                        color="secondary"
                        variant="outlined"
                        value="Finnish-No"
                        onClick={this.handleEmailButtonPress(
                          topic,
                          'rejectFin'
                        )}
                      >
                        Finnish-No
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        value="English-Yes"
                        onClick={this.handleEmailButtonPress(
                          topic,
                          'acceptEng'
                        )}
                      >
                        English-Yes
                      </Button>
                      <Button
                        color="secondary"
                        variant="outlined"
                        value="English-No"
                        onClick={this.handleEmailButtonPress(
                          topic,
                          'rejectEng'
                        )}
                      >
                        English-No
                      </Button>
                    </MuiThemeProvider>
                    <Switch
                      checked={topic.active}
                      onChange={this.handleActiveChange(topic)}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" />
              </List>
            )
          } else {
            return null
          }
        })}
      </div>
    )
  }
}

TopicListPage.propTypes = {
  filter: PropTypes.string.isRequired,
  topics: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  fetchTopics: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    topics: state.topicListPage.topics.data,
    isLoading: state.topicListPage.topics.isLoading,
    filter: state.topicListPage.filter,
    configurations: state.configurationPage.configurations
  }
}

const mapDispatchToProps = {
  fetchTopics: topicListPageActions.fetchTopics,
  updateFilter: topicListPageActions.updateFilter,
  setError: notificationActions.setError,
  setSuccess: notificationActions.setSuccess,
  fetchConfigurations: configurationPageActions.fetchConfigurations
}

const ConnectedTopicListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicListPage)

export default withRouter(ConnectedTopicListPage)
