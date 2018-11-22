import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const Topic = ({ content, isEditable, onPageChange }) => {
  return (
    <div>
      <div className="block">
        <Typography variant="h2" id="title">
          {content.title}
        </Typography>
      </div>
      <div className="block">
        <Typography variant="h4">Customer</Typography>
        <Typography variant="body1">{content.customerName}</Typography>
      </div>
      <div className="block">
        <Typography variant="h4">Contact email</Typography>
        <Typography variant="body1">{content.email}</Typography>
      </div>
      <div className="block">
        <Typography variant="h4">Description</Typography>
        <Typography variant="body1">{content.description}</Typography>
      </div>
      <div className="block">
        <Typography variant="h4">Implementation environment</Typography>
        <Typography variant="body1">{content.environment}</Typography>
      </div>
      <div className="block">
        <Typography variant="h4">Special requests</Typography>
        <Typography variant="body1">{content.specialRequests}</Typography>
      </div>
      <div className="block">
        <Typography variant="h4">Additional info</Typography>
        <Typography variant="body1">{content.additionalInfo}</Typography>
      </div>
      {isEditable && (
        <div>
          <Button variant="contained" color="primary" onClick={onPageChange}>
            Edit
          </Button>
        </div>
      )}
    </div>
  )
}

export default Topic
