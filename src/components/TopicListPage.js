import React from 'react'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItemText'
import topicService from '../services/topic'

class TopicListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: []
    }
  }

  async componentDidMount() {
    const fetchedTopics = await topicService.listAll().then(function(defs){
      return defs
    })
    this.setState({ topics: fetchedTopics })
    console.log(fetchedTopics)
    console.log(this.state.topics)
  }

  render() {
    return(
      <div>
        {this.state.topics.map(topic => (
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

export default TopicListPage