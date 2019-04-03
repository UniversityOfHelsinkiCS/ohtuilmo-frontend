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

import emailService from '../services/email'
import { getEmailTemplateRenderer } from '../utils/functions'
import topicListPageActions from '../reducers/actions/topicListPageActions'
import emailTemplatesActions from '../reducers/actions/emailTemplatesActions'
import * as notificationActions from '../reducers/actions/notificationActions'
import configurationPageActions from '../reducers/actions/configurationPageActions'

import LoadingCover from './common/LoadingCover'
import './TopicListPage.css'

const buttonTheme = createMuiTheme({
  palette: {
    primary: green,
    secondary: red
  }
})

class TopicListPage extends React.Component {
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
      await Promise.all([
        this.props.fetchTopics(),
        this.props.fetchEmailTemplates()
      ])
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
      const newActiveState = !topic.active
      await this.props.setTopicActive(topic, newActiveState)

      const activeDescription = newActiveState ? 'active' : 'inactive'
      this.props.setSuccess(
        `Topic '${topic.content.title}' has been set ${activeDescription}.`,
        3000
      )
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

  /**
   * @param {object} topic
   * @param {string} messageType
   * @param {string} messageLang
   */
  handleEmailButtonPress = (topic, messageType, messageLang) => async () => {
    const { emailTemplates } = this.props
    const templateRenderer = getEmailTemplateRenderer(messageType)

    /** e.g.
     * topicAccepted: {   <-- messageType
     *   finnish: '', <-- messageLang
     *   english: ''
     * }
     */
    const emailTemplate = emailTemplates[messageType][messageLang]
    const renderedEmail = templateRenderer(topic, emailTemplate)

    const topicTitle = topic.content.title
    const ownerEmail = topic.content.email
    const confirmMessage =
      `Do you want to send the following email to the owner of '${topicTitle}' (${ownerEmail})?` +
      `\n\n${renderedEmail}`

    if (!window.confirm(confirmMessage)) {
      return
    }

    try {
      await emailService.sendCustomerEmail(
        topic.content.email,
        messageType,
        messageLang,
        { topicName: topicTitle }
      )
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    const { filter, topics, isLoading } = this.props

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
        {isLoading && (
          <LoadingCover className="topics-container__loading-cover" />
        )}

        <Select
          value={filter}
          onChange={(event) => this.props.updateFilter(event.target.value)}
        >
          {configurationMenuItems()}
        </Select>
        <Typography align="right" variant="subtitle1">
          Active
        </Typography>

        {topics.map((topic) => {
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
                          'topicAccepted',
                          'finnish'
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
                          'topicRejected',
                          'finnish'
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
                          'topicAccepted',
                          'english'
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
                          'topicRejected',
                          'english'
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
  emailTemplates: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  fetchTopics: PropTypes.func.isRequired,
  setTopicActive: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  fetchEmailTemplates: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setSuccess: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { topicListPage, emailTemplates } = state
  return {
    topics: topicListPage.topics,
    // don't show loading cover for update loadings; active state changes are
    // done in quick succession and their "loading" doesn't affect page usage
    isLoading: topicListPage.isTopicsLoading || emailTemplates.isLoading,
    emailTemplates: emailTemplates.templates,
    filter: topicListPage.filter,
    configurations: state.configurationPage.configurations
  }
}

const mapDispatchToProps = {
  fetchTopics: topicListPageActions.fetchTopics,
  updateFilter: topicListPageActions.updateFilter,
  setTopicActive: topicListPageActions.setTopicActive,
  fetchEmailTemplates: emailTemplatesActions.fetchEmailTemplates,
  setError: notificationActions.setError,
  setSuccess: notificationActions.setSuccess,
  fetchConfigurations: configurationPageActions.fetchConfigurations
}

const ConnectedTopicListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicListPage)

export default withRouter(ConnectedTopicListPage)
