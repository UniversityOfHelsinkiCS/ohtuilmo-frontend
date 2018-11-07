import React from 'react'
import { connect } from 'react-redux'
import topicListPageActions from '../reducers/actions/topicListPageActions'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItemText'
import topicService from '../services/topic'

class TopicListPage extends React.Component {

  async componentDidMount() {
    const fetchedTopics = await topicService.listAll().then(function(defs){
      return defs
    })
    this.props.fetchTopics(fetchedTopics)
    console.log(this.props.topics)
  }

  render() {
    return(
      <div>
        {this.props.topics.map(topic => (
          <List key={topic.id}>
            <a href="/">
              <ListItem>
                <ListItemText primary={topic.first} secondary={topic.second} />
              </ListItem>
            </a>
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
  ...topicListPageActions
}

const ConnectedTopicListPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicListPage)

export default ConnectedTopicListPage