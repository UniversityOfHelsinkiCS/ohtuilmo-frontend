import React from 'react'
import { withRouter } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import NavigationMenu from './NavigationMenu'
import { regularItems, loggedInItems, adminItems } from './MenuItemLists'
import './NavigationBar.css'

class NavigationBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  }

  getAppropriateMenuItemList() {
    let itemList = []
    let user = window.localStorage.getItem('loggedInUser')
    user = user ? JSON.parse(user).user : null
    if (!user) {
      itemList = regularItems(this.props.history)
    } else if (!user.admin) {
      itemList = loggedInItems(this.props.history)
    } else {
      itemList = adminItems(this.props.history)
    }

    return itemList
  }

  render() {
    let loggedIn
    let username
    let logoutButton
    if (window.localStorage.getItem('loggedInUser')) {
      loggedIn = <AccountCircle />
      username = (
        <h4 className="navigation-bar-username tracking-in-expand">
          {
            JSON.parse(window.localStorage.getItem('loggedInUser')).user
              .username
          }
        </h4>
      )
      logoutButton = (
        <Button
          className="navigation-bar-logout-button"
          style={{ marginLeft: '10px' }}
          variant="outlined"
          onClick={this.props.logout}
        >
          Log out
        </Button>
      )
    } else {
      loggedIn = ''
    }

    return (
      <div className="navigation-bar-container">
        <AppBar position="static">
          <Toolbar>
            <NavigationMenu menuItems={this.getAppropriateMenuItemList()} />
            <Typography
              variant="h6"
              color="inherit"
              className="grow"
              style={{ marginLeft: '9px' }}
            >
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

export default withRouter(NavigationBar)
