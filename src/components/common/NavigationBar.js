import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
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
    if (window.localStorage.getItem('loggedInUser')) {
      loggedIn = <AccountCircle />
      username = <h4 className='navigation-bar-username tracking-in-expand'>{JSON.parse(window.localStorage.getItem('loggedInUser')).user.username}</h4>
    } else {
      loggedIn = ''
    }

    return (
      <div className='navigation-bar-container'>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className='grow' style={{ marginLeft: '9px' }}>
              Ohjelmistotuotantoprojekti
            </Typography>
            {loggedIn}
            {username}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default NavigationBar
