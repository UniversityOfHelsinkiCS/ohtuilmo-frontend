import React from 'react'
import { connect } from 'react-redux'
import topicFormPageActions from '../reducers/actions/topicFormPageActions'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'
import { info } from './topicCreationInfoDump'
import './topicFormPageInfo.css'

const TopicFormPageInfo = props => {
  return (
    <div className="topic-form-page-info">
      <div>
        {/* Not actually dangerous since html is imported from a static source */}
        <Typography dangerouslySetInnerHTML={{ __html: info }} />
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        onClick={() => {
          window.scrollTo(0,0)
          props.updateShowInfo(false)
        }}
      >
        Create Topic
      </Button>
    </div>
  )
}

const mapDispatchToProps = {
  ...topicFormPageActions
}

const ConnectedTopicFormPageInfo = connect(
  null,
  mapDispatchToProps
)(TopicFormPageInfo)

export default ConnectedTopicFormPageInfo
