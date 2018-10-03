import React, { Component } from 'react'
import loginService from './services/login' 
import { testIncrement } from './reducers/actions/testActions'
import loginPageActions from './reducers/actions/loginPageActions'
import { connect } from 'react-redux'

class App extends Component {

  login = async (event) => {
    event.preventDefault()
    await loginService.login({
      username: this.state.username,
      password: this.state.password
    })
    this.props.clearForm()
  }

  handlePasswordChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.login}>
          <div>
            <input
              type='text'
              name='username'
              placeholder='username'
              value={this.props.username}
              onChange={e => this.props.updateUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type='text'
              name='password'
              placeholder='password'
              value={this.props.password}
              onChange={e => this.props.updatePassword(e.target.value)}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
        <button onClick={e => this.props.testIncrement()}>Reducer test</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    password: state.password
  }
}

const mapDispatchToProps = {
  testIncrement,
  ...loginPageActions
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
