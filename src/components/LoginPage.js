import React from 'react'
import loginService from '../services/login'

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
          <input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => {
              updateUsername(e.target.value)
            }}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              updatePassword(e.target.value)
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage
