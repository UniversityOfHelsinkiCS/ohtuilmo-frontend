import React from 'react'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const TopicSelect = ({
  topics,
  onTopicSelectChange,
  groupTopicID,
  className
}) => {
  return (
    <Select
      className={className}
      value={groupTopicID}
      onChange={(e) => onTopicSelectChange(e.target.value)}
    >
      {topics.map((topic) => (
        <MenuItem
          key={topic.id}
          value={topic.id}
          className={`topic-menu-item-no__${topic.id}`}
        >
          {topic.content.title}
        </MenuItem>
      ))}
    </Select>
  )
}

export default TopicSelect
