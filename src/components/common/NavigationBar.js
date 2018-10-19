import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import './NavigationBar.css'

function NavigationBar() {
  return (
    <div className='navigation-bar-container'>
      <AppBar position="static">
        <Toolbar>
          <IconButton className='menu-button' color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className='grow'>
            Ilmoittautumistyökalu
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}

NavigationBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default NavigationBar