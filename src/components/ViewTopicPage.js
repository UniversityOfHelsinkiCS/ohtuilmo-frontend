import React from 'react'
import { connect } from 'react-redux'
import Topic from './Topic'
import TopicEdit from './TopicEdit'
import viewTopicPageActions from '../reducers/actions/viewTopicPageActions'
import topicService from '../services/topic'
import './ViewTopicPage.css'

class ViewTopicPage extends React.Component {
  async componentDidMount() {
    const id = this.props.match.params.id
    try {
      const topic = await topicService.getOne(id)
      this.props.setTopic(topic)
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
      if (loggedInUser.user.admin === true || isNaN(id)) {
        this.props.setEditable(true)
      }
    } catch (e) {
      console.log(e)
    }
  }

  changePage = () => {
    this.props.setEditMode(true)
  }

  render() {
    //only try to render topic contents when state has been set
    if (!this.props.topic) {
      return <div />
    }
    return (
      <div>
        {this.props.isOnEditMode ? (
          <TopicEdit />
        ) : (
          <Topic
            content={this.props.topic.content}
            isEditable={this.props.isEditable}
            onPageChange={this.changePage}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    topic: state.viewTopicPage.topic,
    isEditable: state.viewTopicPage.isEditable,
    isOnEditMode: state.viewTopicPage.isOnEditMode
  }
}

const mapDispatchToProps = {
  ...viewTopicPageActions
}

const ConnectedViewTopicPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewTopicPage)

export default ConnectedViewTopicPage
