import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ReactMarkdown from 'react-markdown'

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
        <ReactMarkdown>{content.description}</ReactMarkdown>
      </div>
      <div className="block">
        <Typography variant="h4">Implementation environment</Typography>
        <ReactMarkdown>{content.environment}</ReactMarkdown>
      </div>
      <div className="block">
        <Typography variant="h4">Special requests</Typography>
        <ReactMarkdown>{content.specialRequests}</ReactMarkdown>
      </div>
      <div className="block">
        <Typography variant="h4">Additional info</Typography>
        <ReactMarkdown>{content.additionalInfo}</ReactMarkdown>
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
