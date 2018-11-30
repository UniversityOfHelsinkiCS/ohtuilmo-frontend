import React from 'react'
import TextField from '@material-ui/core/TextField'
import registrationPageActions from '../reducers/actions/registrationPageActions'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'

class ViewUserPage extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <div className="block">
          <Typography variant="h5" id="title">
            {JSON.parse(localStorage.getItem('loggedInUser')).user.first_names}
          </Typography>
        </div>
        <div className="block">
          <Typography variant="h5" id="title">
            {JSON.parse(localStorage.getItem('loggedInUser')).user.student_number}
          </Typography>
        </div>
        <div>
          <TextField
            type="email"
            fullWidth
            label="email"
            margin="normal"
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
    email: state.registrationPage.email
  }
}

const mapDispatchToProps = {
  ...registrationPageActions
}

const ConnectedViewUserPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewUserPage)

export default ConnectedViewUserPage