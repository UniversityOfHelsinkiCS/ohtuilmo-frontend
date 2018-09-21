import React, { Component } from 'react';
import './App.css';

class App extends Component {

  login = async (event) => {
    event.preventDefault()
    console.log("login")
  }

  render() {
    return (
      <div>
        <h1>Login</h1>

        <form onSubmit={this.login}>
          <div>
            name:
          <input
              name="name"
            />
          </div>
          <div>
            password:
          <input
              name="password"
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default App;
