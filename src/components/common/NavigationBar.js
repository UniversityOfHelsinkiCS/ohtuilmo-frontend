import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import './NavigationBar.css'

class NavigationBar extends React.Component {

  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
  }

  render() {
    let loggedIn
    let username
    let logoutButton
    if (window.localStorage.getItem('loggedInUser')) {
      loggedIn = <AccountCircle />
      username = <h4 className='navigation-bar-username tracking-in-expand'>{JSON.parse(window.localStorage.getItem('loggedInUser')).user.username}</h4>
      logoutButton = <Button style={{ marginLeft: '10px' }} variant="outlined" onClick={this.props.logout}>Log out</Button>
    } else {
      loggedIn = ''
    }

    console.log(this.props.logout)
    return (
      <div className='navigation-bar-container'>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className='grow' style={{ marginLeft: '9px' }}>
              Software engineering project
            </Typography>
            {loggedIn}
            {username}
            {logoutButton}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default NavigationBar
