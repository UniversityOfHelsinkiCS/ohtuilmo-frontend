import React from 'react'
import TextField from '@material-ui/core/TextField'
import registrationPageActions from '../reducers/actions/registrationPageActions'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'

class UserDetails extends React.Component {
  render() {
    var firstname = this.props.user.first_names
    if (firstname.includes('*'))
      firstname = firstname.split('*')[1].split(' ')[0]
    else firstname = firstname.split(' ')[0]

    return (
      <div>
        <Typography variant="h6" id="title">
          Name: {firstname} {this.props.user.last_name}
        </Typography>
        <Typography variant="h6" id="title">
          Studet number: {this.props.user.student_number}
        </Typography>
        <p>Please fill your email</p>
        <div>
          <TextField
            type="email"
            required
            label="Email"
            margin="normal"
            style={{ width: '250px', marginTop: 0 }}
            value={this.props.email}
            onChange={(e) => this.props.updateEmail(e.target.value)}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.registrationPage.email,
    user: state.loginPage.user.user
  }
}

const mapDispatchToProps = {
  ...registrationPageActions
}

const ConnectedUserDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserDetails)

export default ConnectedUserDetails
