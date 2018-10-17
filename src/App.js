import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import NewTopicForm from './components/NewTopicForm'
import ButtonAppBar from './components/common/ButtonAppBar'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="Wrapper" style={wrapperStyle}>
          <ButtonAppBar />
          <div className="Content" style={contentStyle}>
            <Switch>
              <Route exact path='/' render={() => <LoginPage />} />
              <Route path='/create/topic' render={() => <NewTopicForm />} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column'
}

const contentStyle = {
  padding: '20px'
}

export default App
