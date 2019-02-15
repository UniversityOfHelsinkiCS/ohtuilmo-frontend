import React from 'react'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

const getBackgroundColor = (type) => {
  switch (type) {
  case 'error':
    return 'red'
  case 'success':
    return 'green'
  default:
    return 'skyblue'
  }
}

const Notification = ({ type, message, open }) => {
  if (message === null || message === '') {
    return null
  }

  const style = {
    margin: '10px',
    borderRadius: '4px',
    backgroundColor: getBackgroundColor(type)
  }

  return (
    <div className="notification">
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
      >
        <SnackbarContent
          style={style}
          message={message}
          headlineMapping={{
            body1: 'div',
            body2: 'div'
          }}
        />
      </Snackbar>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { notifications } = state
  const { type, open, message } = notifications

  return {
    type,
    open,
    message
  }
}

export default connect(mapStateToProps)(Notification)
