import React from 'react'
import { connect } from 'react-redux'
import topicEditPageActions from '../reducers/actions/topicEditPageActions'
import notificationActions from '../reducers/actions/notificationActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
// import topicService from '../services/topic'

const TopicEdit = (props) => {
  const submitForm = async (event) => {
    event.preventDefault()
    // const topic = {
    //   id: props.match.params.id,
    //   content: props.content
    // }
    // try {
    //   await topicService.update(topic)
    //   props.setSuccess('Topic updated succesfully!')
    //   setTimeout(() => {
    //     props.clearNotifications()
    //   }, 3000)
    // } catch (e) {
    //   console.log(e)
    //   if (e.response) {
    //     if (e.response.status === 401) {
    //       props.setError('You do not have permission to edit this topic')
    //     } else {
    //       props.setError('Some error happened')
    //     }
    //   }
    //   setTimeout(() => {
    //     props.clearNotifications()
    //   }, 3000)
    // }
    console.log('submitting form', props.content)
  }

  return (
    <div>
      <h1>Edit topic proposal</h1>
      <form onSubmit={submitForm}>
        <div>
          <TextField
            fullWidth
            required
            label="aihe / title"
            margin="normal"
            value={props.title}
            onChange={(e) => props.updateTitle(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            label="asiakas / customer"
            margin="normal"
            value={props.customerName}
            onChange={(e) => props.updateCustomerName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            label="yhteyshenkilön email / contact email"
            margin="normal"
            value={props.email}
            onChange={(e) => props.updateEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            label="aiheen kuvaus / description"
            multiline
            rows="5"
            margin="normal"
            value={props.description}
            onChange={(e) => props.updateDescription(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            required
            label="toteutusympäristö / implementation environment"
            multiline
            rows="5"
            margin="normal"
            value={props.environment}
            onChange={(e) => props.updateEnvironment(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="erityisvaatimukset / special requests"
            multiline
            rows="5"
            margin="normal"
            value={props.specialRequests}
            onChange={(e) => props.updateSpecialRequests(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="lisätietoja / additional info"
            multiline
            rows="5"
            margin="normal"
            value={props.additionalInfo}
            onChange={(e) => props.updateAdditionalInfo(e.target.value)}
          />
        </div>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    content: state.topicEditPage,
    title: state.topicEditPage.title,
    customerName: state.topicEditPage.customerName,
    email: state.topicEditPage.email,
    description: state.topicEditPage.description,
    environment: state.topicEditPage.environment,
    specialRequests: state.topicEditPage.specialRequests,
    additionalInfo: state.topicEditPage.additionalInfo
  }
}

const mapDispatchToProps = {
  ...topicEditPageActions,
  ...notificationActions
}

const ConnectedTopicEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicEdit)

export default ConnectedTopicEdit
