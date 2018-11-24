import React from 'react'
import { connect } from 'react-redux'
import topicFormPageActions from '../reducers/actions/topicFormPageActions'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'

const TopicForm = (props) => {
  return (
    <form onSubmit={props.onSubmit}>
      <div>
        <TextField
          fullWidth
          required
          label="title / aihe"
          margin="normal"
          value={props.content.title}
          onChange={(e) => props.updateTitle(e.target.value)}
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          label="customer / asiakas"
          margin="normal"
          value={props.content.customerName}
          onChange={(e) => props.updateCustomerName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          type="email"
          fullWidth
          required
          label="contact email / yhteyshenkilön email"
          margin="normal"
          value={props.content.email}
          onChange={(e) => props.updateEmail(e.target.value)}
        />
      </div>
      <p>The fields below have Markdown support. / Seuraavia kenttiä voi muotoilla Markdown-notaatiolla.</p>
      <div>
        <TextField
          fullWidth
          required
          label="description / aiheen kuvaus"
          multiline
          rows="5"
          margin="normal"
          value={props.content.description}
          onChange={(e) => props.updateDescription(e.target.value)}
        />
      </div>
      <div>
        <TextField
          fullWidth
          required
          label="implementation environment / toteutusympäristö"
          multiline
          rows="5"
          margin="normal"
          value={props.content.environment}
          onChange={(e) => props.updateEnvironment(e.target.value)}
        />
      </div>
      <div>
        <TextField
          fullWidth
          label="special requests / erityisvaatimukset"
          multiline
          rows="5"
          margin="normal"
          value={props.content.specialRequests}
          onChange={(e) => props.updateSpecialRequests(e.target.value)}
        />
      </div>
      <div>
        <TextField
          fullWidth
          label="additional info / lisätietoja"
          multiline
          rows="5"
          margin="normal"
          value={props.content.additionalInfo}
          onChange={(e) => props.updateAdditionalInfo(e.target.value)}
        />
      </div>
      <FormControlLabel
        control={
          <Button type="submit" variant="contained" color="primary">
            {props.submitButtonText}
          </Button>
        }
      />
    </form>
  )
}

const mapDispatchToProps = {
  ...topicFormPageActions
}

const ConnectedTopicForm = connect(
  null,
  mapDispatchToProps
)(TopicForm)

export default ConnectedTopicForm
