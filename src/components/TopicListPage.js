import React from 'react'
import { connect } from 'react-redux'
import topicListPageActions from '../reducers/actions/topicListPageActions'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'
import Divider from '@material-ui/core/Divider'
import topicService from '../services/topic'

class TopicListPage extends React.Component {

  async componentDidMount() {
    const fetchedTopics = await topicService.listAll().then(function(defs){
      return defs
    })
    this.props.fetchTopics(fetchedTopics)
    console.log(this.props.topics)
  }

  // ListItemText primary and secondary should be changed as {topic.content.title} and {topic.content.customerName}
  // when the fetch is wanted to be done from the database (instead of topic.title and topic.customerName).

  render() {
    return(
      <div>
        {this.props.topics.map(topic => (
          <List key={topic.id}>
            <a href="/">
              <ListItem>
                <ListItemText primary={topic.title} secondary={topic.customerName} />
                <ListItemSecondaryAction>
                  <Switch />
                </ListItemSecondaryAction>
              </ListItem>
            </a>
            <Divider inset />
          </List>
        ))}
        <List>
          <a href="/">
            <ListItem>
              <ListItemText primary='Static Topic Title' secondary='Static Customer Name' />
              <ListItemSecondaryAction>
                <Switch />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider inset />
          </a>
        </List>
        <List>
          <a href="/">
            <ListItem>
              <ListItemText primary='Secondary Topic' secondary='Secondary Customer' />
              <ListItemSecondaryAction>
                <Switch />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider inset />
          </a>
        </List>
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
  ...topicListPageActions
}

const ConnectedTopicListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicListPage)

export default ConnectedTopicListPage