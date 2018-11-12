import React from 'react'
import { connect } from 'react-redux'
import topicListPageActions from '../reducers/actions/topicListPageActions'
import notificationActions from '../reducers/actions/notificationActions'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'
import Divider from '@material-ui/core/Divider'
import topicService from '../services/topic'

class TopicListPage extends React.Component {

  async componentDidMount() {
    const fetchedTopics = await topicService.listAll().then(function (defs) {
      return defs
    })
    //sorts topics based on timestamp
    const sortedTopics = fetchedTopics.sort((t1, t2) =>
      t1.createdAt > t2.createdAt ? -1 : t1.createdAt < t2.createdAt ? 1 : 0
    )
    this.props.updateTopics(sortedTopics)
    console.log(this.props.topics)
  }

  handleActiveChange = topic => async (event) => {
    event.preventDefault()
    try {
      const id = topic.topic_id
      topic.active = !topic.active
      const updatedTopics = this.props.topics.map(t => { return t.topic_id === id ? topic : t })
      const response = await topicService.update(topic)
      this.props.updateTopics(updatedTopics)
      console.log(response)
      this.props.setSuccess('Topic update submitted succesfully!')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Some error happened')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
    }
  }

  render() {
    return (
      <div>
        {this.props.topics.map(topic => (
          <List key={topic.topic_id}>
            <ListItem>
              <a href={'/topics/' + topic.topic_id}>
                <ListItemText primary={topic.content.title} />
              </a>
              <ListItemText primary={`${topic.content.customerName} (${topic.content.email})`} secondary={topic.createdAt} />
              <ListItemSecondaryAction>
                <Switch
                  checked={topic.active}
                  onChange={this.handleActiveChange(topic)}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider inset />
          </List>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    topics: state.topicListPage.topics
  }
}

const mapDispatchToProps = {
  ...topicListPageActions,
  ...notificationActions
}

const ConnectedTopicListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicListPage)

export default ConnectedTopicListPage