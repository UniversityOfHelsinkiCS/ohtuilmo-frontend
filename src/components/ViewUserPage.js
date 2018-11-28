import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class ViewUserPage extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>User details</h1>
        <div>
          <TextField
            fullWidth
            label="name"
            margin="normal"
            value={JSON.parse(localStorage.getItem('loggedInUser')).user.first_names}
          />
        </div>
        <div>
          <TextField
            fullWidth
            label="student number"
            margin="normal"
            value={JSON.parse(localStorage.getItem('loggedInUser')).user.student_number}
          />
        </div>
        <form onSubmit={this.submitForm}>
          <div>
            <TextField
              fullWidth
              label="email"
              margin="normal"
              value={JSON.parse(localStorage.getItem('loggedInUser')).user.email}
              onChange={(e) => this.props.updateEmail(e.target.value)}
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

export default ViewUserPage