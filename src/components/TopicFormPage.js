import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import topicFormPageActions from '../reducers/actions/topicFormPageActions'
import notificationActions from '../reducers/actions/notificationActions'
import Button from '@material-ui/core/Button'
import topicService from '../services/topic'
import Topic from './Topic'
import TopicForm from './TopicForm'
import TopicFormPageInfo from './TopicFormPageInfo'
import './TopicFormPage.css'

class TopicFormPage extends React.Component {
  submitForm = async event => {
    event.preventDefault()
    try {
      const content = { content: this.props.content }
      const createdTopic = await topicService.create(content)

      this.props.setSuccess('Topic proposal submitted succesfully!')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
      this.props.clearForm()

      this.props.updateSecretId(createdTopic.secret_id)
      this.props.setSaved(true)
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Some error happened')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
    }
  }

  render() {
    if (this.props.isSaved === true) {
      return (
        <Redirect
          to={process.env.PUBLIC_URL + '/topics/' + this.props.secretId}
        />
      )
    }

    if (this.props.showInfo) {
      return (
        <TopicFormPageInfo />
      )
    }

    return (
      <div className="topic-submit-page-container">
        <div className="topic-form-container">
          {this.props.preview ? (
            <div>
              <Topic content={this.props.content} />
              <div className="preview-button">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => this.props.updatePreview(false)}
                >
                  Back to edit
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h1>Give your proposal</h1>
              <p>Projektin kuvaus voi olla myös suomeksi.</p>
              <TopicForm
                content={this.props.content}
                onSubmit={this.submitForm}
                submitButtonText="submit proposal"
                isEditForm={false}
              />
              <div className="preview-button">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => this.props.updatePreview(true)}
                >
                  Preview
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    content: state.topicFormPage.content,
    showInfo: state.topicFormPage.showInfo,
    preview: state.topicFormPage.preview,
    isSaved: state.topicFormPage.isSaved,
    secretId: state.topicFormPage.secretId
  }
}

const mapDispatchToProps = {
  ...topicFormPageActions,
  ...notificationActions
}

const ConnectedTopicFormPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicFormPage)

export default ConnectedTopicFormPage
