import React from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ReactMarkdown from 'react-markdown'
import './Topic.css'

const Topic = ({ content, isEditable, onPageChange }) => {
  return (
    <div className="single-topic-container">
      <div className="block">
        <Typography variant="h5" id="title">
          {content.title}
        </Typography>
      </div>
      <div className="block">
        <Typography variant="h7">Customer</Typography>
        <Typography variant="body1">{content.customerName}</Typography>
      </div>
      <div className="block">
        <Typography variant="h7">Contact email</Typography>
        <Typography variant="body1">{content.email}</Typography>
      </div>
      <div className="block">
        <Typography variant="h7">Description</Typography>
        <ReactMarkdown>{content.description}</ReactMarkdown>
      </div>
      <div className="block">
        <Typography variant="h7">Implementation environment</Typography>
        <ReactMarkdown>{content.environment}</ReactMarkdown>
      </div>
      <div className="block">
        <Typography variant="h7">Special requests</Typography>
        <ReactMarkdown>{content.specialRequests? content.specialRequests : '-'}</ReactMarkdown>
      </div>
      <div className="block">
        <Typography variant="h7">Additional information</Typography>
        <ReactMarkdown>{content.additionalInfo? content.additionalInfo : '-'}</ReactMarkdown>
      </div>
      {isEditable && (
        <div className="topic-edit-button">
          <Button variant="contained" color="primary" onClick={onPageChange}>
            Edit
          </Button>
        </div>
      )}
    </div>
  )
}

export default Topic
