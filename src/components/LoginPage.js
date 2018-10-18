import React from 'react'
import { connect } from 'react-redux'
import loginService from '../services/login'
import loginPageActions from '../reducers/actions/loginPageActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

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
    <div>
      <h1>Login</h1>
      <form onSubmit={login}>
        <div>
          <TextField
            error={username.length > 20 ? true : false}
            type='text'
            name='username'
            label="Username"
            value={username}
            onChange={(e) => updateUsername(e.target.value)}
          />
        </div>
        <div>
          <TextField
            error={password.length > 20 ? true : false}
            type='password'
            name='password'
            label='Password'
            value={password}
            onChange={(e) => updatePassword(e.target.value)}
          />
        </div>
        <Button color="primary" type="submit">Login</Button>
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
