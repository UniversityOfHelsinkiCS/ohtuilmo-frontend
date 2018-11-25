import React from 'react'
import { connect } from 'react-redux'
import topicEditPageActions from '../reducers/actions/topicEditPageActions'
import notificationActions from '../reducers/actions/notificationActions'
import viewTopicPageActions from '../reducers/actions/viewTopicPageActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import topicService from '../services/topic'

class TopicEditPage extends React.Component {
  componentDidMount() {
    if (this.props.topic) {
      this.props.setCurrentTopic(this.props.topic)
    } else {
      this.props.setError('Could not edit topic')
      this.props.setEditMode(false)
    }
  }

  submitForm = async (event) => {
    event.preventDefault()
    const topic = {
      id: this.props.id,
      content: this.props.content
    }
    try {
      await topicService.update(topic)
      this.props.setSuccess('Topic updated succesfully!')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
      this.props.setEditMode(false)
      this.props.setTopicContent(this.props.content)
    } catch (e) {
      console.log(e)
      if (e.response) {
        if (e.response.status === 401) {
          this.props.setError('You do not have permission to edit this topic')
        } else {
          this.props.setError('Some error happened')
        }
      }
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
      this.props.setEditMode(false)
    }
  }

  render() {
    return (
      <div>
        <h1>Edit topic proposal</h1>
        <form onSubmit={this.submitForm}>
          <div>
            <TextField
              fullWidth
              required
              label="title / aihe"
              margin="normal"
              value={this.props.content.title}
              onChange={(e) => this.props.updateTitle(e.target.value)}
            />
          </div>
          <div>
            <TextField
              fullWidth
              required
              label="customer / asiakas"
              margin="normal"
              value={this.props.content.customerName}
              onChange={(e) => this.props.updateCustomerName(e.target.value)}
            />
          </div>
          <div>
            <TextField
              type="email"
              fullWidth
              required
              label="contact email / yhteyshenkilön email"
              margin="normal"
              value={this.props.content.email}
              onChange={(e) => this.props.updateEmail(e.target.value)}
            />
          </div>
          <div>
            <TextField
              fullWidth
              required
              label="description / aiheen kuvaus (Markdown field)"
              multiline
              rows="5"
              margin="normal"
              value={this.props.content.description}
              onChange={(e) => this.props.updateDescription(e.target.value)}
            />
          </div>
          <div>
            <TextField
              fullWidth
              required
              label="implementation environment / toteutusympäristö (Markdown field)"
              multiline
              rows="5"
              margin="normal"
              value={this.props.content.environment}
              onChange={(e) => this.props.updateEnvironment(e.target.value)}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="special requests / erityisvaatimukset (Markdown field)"
              multiline
              rows="5"
              margin="normal"
              value={this.props.content.specialRequests}
              onChange={(e) => this.props.updateSpecialRequests(e.target.value)}
            />
          </div>
          <div>
            <TextField
              fullWidth
              label="additional info / lisätietoja (Markdown field)"
              multiline
              rows="5"
              margin="normal"
              value={this.props.content.additionalInfo}
              onChange={(e) => this.props.updateAdditionalInfo(e.target.value)}
            />
          </div>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    content: state.topicEditPage.content
  }
}

const mapDispatchToProps = {
  ...topicEditPageActions,
  ...notificationActions,
  ...viewTopicPageActions
}

const ConnectedTopicEditPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicEditPage)

export default ConnectedTopicEditPage
