import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

const Notification = ({ message, open }) => {
  if ((message === null) | (message === '')) {
    return null
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

const style = {
  backgroundColor: 'red',
  margin: '10px',
  borderRadius: '4px'
}

export default Notification
