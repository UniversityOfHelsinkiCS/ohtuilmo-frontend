import React from 'react'
import { connect } from 'react-redux'
import loginService from '../services/login'
import loginPageActions from '../reducers/actions/loginPageActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import './LoginPage.css'

const LoginPage = ({ username, password, updateUsername, updatePassword }) => {
  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      console.log('success!!!', user)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="loginpage-container">
      <h1 className="loginpage-header">Kirjaudu sisään</h1>
      <p className="loginpage-information">Kirjautuminen vaatii Helsingin yliopiston käyttäjätunnuksen</p>
      <form onSubmit={login}>
        <div>
          <TextField className="username-field"
            error={username.length > 20 ? true : false}
            type='text'
            name='username'
            label="Käyttäjätunnus"
            value={username}
            onChange={(e) => updateUsername(e.target.value)}
          />
        </div>
        <div>
          <TextField className="password-field"
            error={password.length > 20 ? true : false}
            type='password'
            name='password'
            label='Salasana'
            value={password}
            onChange={(e) => updatePassword(e.target.value)}
          />
        </div>
        <Button className="loginpage-button" style={{ marginTop: '30px' }} variant="outlined" color="default" type="submit">Login</Button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    username: state.loginPage.username,
    password: state.loginPage.password
  }
}

const mapDispatchToProps = {
  ...loginPageActions
}

const ConnectedLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage)

export default ConnectedLoginPage
