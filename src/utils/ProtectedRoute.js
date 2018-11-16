import React from 'react'
import { BrowserRouter as Redirect, Route } from 'react-router-dom'
import LandingPage from '../components/LandingPage'

class ProtectedRoute extends React.Component {

  render() {
    console.log(this.props)
    const { component: Component, ...props } = this.props
    console.log(this.props)
    console.log(props.user)
    console.log(LandingPage)
    if (props.user === null) {
      console.log(props.user)
      return (<Redirect to='/login'/>)
    }
    console.log(...props)

    return (
      <Route render={() => <Component/>}/>
    )
  }
}

export default ProtectedRoute