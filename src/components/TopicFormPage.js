import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import topicFormPageActions from '../reducers/actions/topicFormPageActions'
import notificationActions from '../reducers/actions/notificationActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import topicService from '../services/topic'
import Topic from './Topic'

class TopicFormPage extends React.Component {
  submitForm = async (event) => {
    event.preventDefault()
    try {
      const content = { content: this.props.content }
      const response = await topicService.create(content)

      this.props.setSuccess('Topic proposal submitted succesfully!')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
      this.props.clearForm()

      this.props.updateSecretId(response.topic.secret_id)
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
      return <Redirect to={'/topics/' + this.props.secretId} />
    }

    return (
      <div>
        {this.props.preview ? (
          <div>
            <Topic
              content={this.props.content}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.props.preview}
                  onChange={() => this.props.updatePreview(false)}
                />
              }
              label="Preview topic proposal"
            />
          </div>
        ) : (
          <div>
            <h1>Give your proposal</h1>
            <p>Projektin kuvaus voi olla myös suomeksi.</p>

            <form onSubmit={this.submitForm}>
              <div>
                <TextField
                  fullWidth
                  required
                  label="aihe / title"
                  margin="normal"
                  value={this.props.title}
                  onChange={(e) => this.props.updateTitle(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  required
                  label="asiakas / customer"
                  margin="normal"
                  value={this.props.customerName}
                  onChange={(e) => this.props.updateCustomerName(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  type="email"
                  fullWidth
                  required
                  label="yhteyshenkilön email / contact email"
                  margin="normal"
                  value={this.props.email}
                  onChange={(e) => this.props.updateEmail(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  required
                  label="aiheen kuvaus / description (Markdown field)"
                  multiline
                  rows="5"
                  margin="normal"
                  value={this.props.description}
                  onChange={(e) => this.props.updateDescription(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  required
                  label="toteutusympäristö / implementation environment (Markdown field)"
                  multiline
                  rows="5"
                  margin="normal"
                  value={this.props.environment}
                  onChange={(e) => this.props.updateEnvironment(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  label="erityisvaatimukset / special requests (Markdown field)"
                  multiline
                  rows="5"
                  margin="normal"
                  value={this.props.specialRequests}
                  onChange={(e) => this.props.updateSpecialRequests(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  label="lisätietoja / additional info (Markdown field)"
                  multiline
                  rows="5"
                  margin="normal"
                  value={this.props.additionalInfo}
                  onChange={(e) => this.props.updateAdditionalInfo(e.target.value)}
                />
              </div>
              <FormControlLabel
                control={
                  <Button type="submit" variant="contained" color="primary">
                    Submit proposal
                  </Button>
                }
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={this.props.preview}
                    onChange={() => this.props.updatePreview(true)}
                  />
                }
                label="Preview topic proposal"
              />
            </form>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    content: state.topicFormPage,
    title: state.topicFormPage.title,
    customerName: state.topicFormPage.customerName,
    email: state.topicFormPage.email,
    description: state.topicFormPage.description,
    environment: state.topicFormPage.environment,
    specialRequests: state.topicFormPage.specialRequests,
    additionalInfo: state.topicFormPage.additionalInfo,
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
