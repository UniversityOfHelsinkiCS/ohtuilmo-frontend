import React from 'react'
import { connect } from 'react-redux'
import topicEditPageActions from '../reducers/actions/topicEditPageActions'
import notificationActions from '../reducers/actions/notificationActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class TopicEditPage extends React.Component {
  submitForm = async (event) => {
    event.preventDefault()
    console.log('editing post')
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
              label="aiheen kuvaus / description"
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
              label="toteutusympäristö / implementation environment"
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
              label="erityisvaatimukset / special requests"
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
              label="lisätietoja / additional info"
              multiline
              rows="5"
              margin="normal"
              value={this.props.additionalInfo}
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

const ConnectedtopicEditPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicEditPage)

export default ConnectedtopicEditPage
