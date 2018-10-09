import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import loginPageActions from './reducers/actions/loginPageActions'
import LoginPage from './components/LoginPage'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route
            exact path="/"
            render={() => (
              <LoginPage
                username={this.props.username}
                password={this.props.password}
                updateUsername={this.props.updateUsername}
                updatePassword={this.props.updatePassword}
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
