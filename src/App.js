import React, { Component } from 'react'
import loginService from './services/login' 

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  login = async (event) => {
    event.preventDefault()
    await loginService.login({
      username: this.state.username,
      password: this.state.password
    })
  }

  handleFieldChange = (event) => {
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
              value={this.state.username}
              onChange={this.handleFieldChange}
            />
          </div>
          <div>
            <input
              type='password'
              name='password'
              placeholder='password'
              value={this.state.password}
              onChange={this.handleFieldChange}
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }
}

export default App
