import React from 'react'
import { connect } from 'react-redux'
import loginService from '../services/login'
import loginPageActions from '../reducers/actions/loginPageActions'
import notificationActions from '../reducers/actions/notificationActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import './LoginPage.css'

class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    this.login = this.login.bind(this)
  }

  login = async (event) => {
    event.preventDefault()
    let username = this.props.username
    let password = this.props.password

    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      this.props.updateUser(JSON.parse(window.localStorage.getItem('loggedInUser')))
      this.props.setSuccess('Logged in succesfully!')
      this.props.clearForm()

      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
    } catch (e) {
      console.log('error happened', e.response)

      if (e.response) {
        if (e.response.status === 400) {
          this.props.setError('Username or password is missing!')
        } else if (e.response.status === 401) {
          this.props.setError('Incorrect username or password!')
        }
      } else {
        this.props.setError('Some error happened, could not log in')
      }

      this.props.setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
    }
  }

  render() {
    return (
      <div className="loginpage-container">
        <h1 className="loginpage-header">Kirjaudu sisään</h1>
        <p className="loginpage-information">Kirjautuminen vaatii Helsingin yliopiston käyttäjätunnuksen</p>
        <form onSubmit={this.login}>
          <div>
            <TextField
              className="username-field"
              error={this.props.username.length > 20 ? true : false}
              type='text'
              name='username'
              label="Käyttäjätunnus"
              value={this.props.username}
              onChange={(e) => this.props.updateUsername(e.target.value)}
            />
          </div>
          <div>
            <TextField className="password-field"
              error={this.props.password.length > 20 ? true : false}
              type='password'
              name='password'
              label='Salasana'
              value={this.props.password}
              onChange={(e) => this.props.updatePassword(e.target.value)}
            />
          </div>
          <Button className="loginpage-button" style={{ marginTop: '30px' }} variant="outlined" color="default" type="submit">Kirjaudu</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.loginPage.username,
    password: state.loginPage.password,
    user: state.loginPage.user
  }
}

const mapDispatchToProps = {
  ...loginPageActions,
  ...notificationActions
}

const ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

export default ConnectedLoginPage
