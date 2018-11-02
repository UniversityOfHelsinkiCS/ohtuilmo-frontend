import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

const Notification = ({ type, message, open }) => {
  if ((message === null) | (message === '')) {
    return null
  }

  var style = {
    margin: '10px',
    borderRadius: '4px'
  }

  if (type === 'error') {
    style = {
      ...style,
      backgroundColor: 'red'
    }
  } else if (type === 'success') {
    style = {
      ...style,
      backgroundColor: 'green'
    }
  } else {
    style = {
      ...style,
      backgroundColor: 'skyblue'
    }
  }

  return (
    <div>
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

export default Notification
