import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import loginService from './services/login'
import loginPageActions from './reducers/actions/loginPageActions'
import LoginPage from './components/LoginPage'

class App extends Component {
  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.props.username,
        password: this.props.password
      })
      console.log('success!!!', user)
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Route
            exact
            path="/"
            render={() => (
              <LoginPage
                username={this.props.username}
                password={this.props.password}
                updateUsername={this.props.updateUsername}
                updatePassword={this.props.updatePassword}
                login={this.login}
              />
            )}
          />
        </div>
      </Router>
    )
  }
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

const ConnectedApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default ConnectedApp
