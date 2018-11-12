import React from 'react'
import { connect } from 'react-redux'
import viewTopicPageActions from '../reducers/actions/viewTopicPageActions'
import topicService from '../services/topic'
import Typography from '@material-ui/core/Typography'
import './ViewTopicPage.css'

class ViewTopicPage extends React.Component {

  async componentDidMount() {
    const topic = await topicService.getOne(this.props.match.params.id)
    this.props.setTopic(topic)
  }

  render() {
    //only try to render topic contents when state has been set
    const contents = this.props.topic ?
      <div>
        <div className='block'>
          <Typography variant='h2' id='title' >{this.props.topic.content.title}</Typography>
        </div>
        <div className='block'>
          <Typography variant='h4'>Customer</Typography>
          <Typography variant='body1'>{this.props.topic.content.customerName}</Typography>
        </div>
        <div className='block'>
          <Typography variant='h4'>Contact email</Typography>
          <Typography variant='body1'>{this.props.topic.content.email}</Typography>
        </div>
        <div className='block'>
          <Typography variant='h4'>Description</Typography>
          <Typography variant='body1'>{this.props.topic.content.description}</Typography>
        </div>
        <div className='block'>
          <Typography variant='h4'>Implementation environment</Typography>
          <Typography variant='body1'>{this.props.topic.content.environment}</Typography>
        </div>
        <div className='block'>
          <Typography variant='h4'>Special requests</Typography>
          <Typography variant='body1'>{this.props.topic.content.specialRequests}</Typography>
        </div>
        <div className='block'>
          <Typography variant='h4'>Additional info</Typography>
          <Typography variant='body1'>{this.props.topic.content.additionalInfo}</Typography>
        </div>
      </div>
      :
      <div></div>
    return (
      <div>
        {contents}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    topic: state.viewTopicPage.topic
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