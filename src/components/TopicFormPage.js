import React from 'react'
import { connect } from 'react-redux'
import topicFormPageActions from '../reducers/actions/topicFormPageActions'
import notificationActions from '../reducers/actions/notificationActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import topicService from '../services/topic'

const TopicFormPage = (props) => {
  const submitForm = async (event) => {
    event.preventDefault()
    try {
      const content = { content: props.content }
      const response = await topicService.create(content)
      console.log(response)
      props.setSuccess('Topic proposal submitted succesfully!')
      setTimeout(() => {
        props.clearNotifications()
      }, 3000)
      props.clearForm()
    } catch (e) {
      console.log('error happened', e.response)
      props.setError('Some error happened')
      setTimeout(() => {
        props.clearNotifications()
      }, 3000)
    }
  }

  return (
    <div>
      <h1>Give your proposal</h1>
      <p>Projektin kuvaus voi olla myös suomeksi.</p>

      <form onSubmit={submitForm}>
        <div>
          <TextField
            fullWidth
            label="aihe / title"
            margin="normal"
            value={props.title}
            onChange={(e) => props.updateTitle(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="asiakas / customer"
            margin="normal"
            value={props.customerName}
            onChange={(e) => props.updateCustomerName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="yhteyshenkilön email / contact email"
            margin="normal"
            value={props.email}
            onChange={(e) => props.updateEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            fullWidth
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
        <Temporary />
        <Button type="submit" variant="contained" color="primary">
          Submit proposal
        </Button>
      </form>
    </div>
  )
}

const Temporary = () => (
  <div>
    <FormControl component="fieldset" margin="normal">
      <FormLabel component="legend">sopivat ajankohdat / possible timeframes</FormLabel>
      <FormGroup>
        <FormControlLabel control={<Checkbox checked={false} />} label="kevät" />
        <FormControlLabel control={<Checkbox checked={false} />} label="kesä" />
        <FormControlLabel control={<Checkbox checked={true} />} label="syksy" />
      </FormGroup>
    </FormControl>
  </div>
)

const mapStateToProps = (state) => {
  return {
    content: state.topicFormPage,
    title: state.topicFormPage.title,
    customerName: state.topicFormPage.customerName,
    email: state.topicFormPage.email,
    description: state.topicFormPage.description,
    environment: state.topicFormPage.environment,
    specialRequests: state.topicFormPage.specialRequests,
    additionalInfo: state.topicFormPage.additionalInfo
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
