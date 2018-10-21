import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import './NavigationBar.css'


function NavigationBar() {
  return (
    <div className='navigation-bar-container'>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className='grow'>
            Ohjelmistotuotantoprojekti / Software engineering project
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