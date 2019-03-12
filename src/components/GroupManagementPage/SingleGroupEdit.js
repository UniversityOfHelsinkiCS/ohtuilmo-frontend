import React from 'react'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import groupManagementService from '../../services/groupManagement'
import * as notificationActions from '../../reducers/actions/notificationActions'
import groupManagementActions from '../../reducers/actions/groupManagementActions'

const TopicSelect = ({ topics, onTopicSelectChange, groupTopicID }) => {
  return (
    <Select
      value={groupTopicID}
      onChange={(e) => onTopicSelectChange(e.target.value)}
    >
      {topics.map((topic) => (
        <MenuItem key={topic.id} value={topic.id}>
          {topic.content.title}
        </MenuItem>
      ))}
    </Select>
  )
}

const updateCreatedGroup = async (event, props) => {
  event.preventDefault()

  const {
    id,
    name,
    topicId,
    studentIds,
    instructorId,
    configurationId
  } = props.group

  const splitStudents = studentIds
    .split(/[;,\n]/)
    .map((student) => student.trim())
    .filter((str) => !!str)

  try {
    const updatedGroup = await groupManagementService.put({
      id: id,
      name: name,
      topicId: topicId,
      configurationId: configurationId,
      instructorId: instructorId,
      studentIds: splitStudents
    })

    props.updateExistingGroup(updatedGroup)

    props.toggleEditMode()

    props.setSuccess('Group updated!')
  } catch (e) {
    console.log(e)
    props.setError(`Failed to updated group! ${e.response.data.error}`)
  }
}

const deleteExistingGroup = async (event, props) => {
  event.preventDefault()

  const {
    id,
    name,
    topicId,
    studentIds,
    configurationId,
    instructorId
  } = props.group

  const groupToDelete = {
    id: id,
    name: name,
    topicId: topicId,
    configurationId: configurationId,
    instructorId: instructorId,
    studentIds: studentIds
  }

  try {
    await groupManagementService.del({
      id: id
    })
    props.deleteGroup(groupToDelete)

    props.setSuccess('Group deleted!')
  } catch (e) {
    props.setError(`Failed to delte! ${e.response.data.error}`)
  }
}

class SingleGroupEdit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: props.group.id,
      name: props.group.name,
      topicId: props.group.topicId,
      configurationId: props.group.configurationId,
      instructorId: props.group.instructorId,
      studentIds: props.group.studentIds.join('\n')
    }
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  handleStudentChange = (event) => {
    this.setState({ studentIds: event.target.value })
  }

  handleInstructorChange = (event) => {
    this.setState({ instructorId: event.target.value })
  }

  handleTopicChange = (e) => {
    this.setState({ topicId: e })
  }

  render() {
    const {
      group,
      topics,
      deleteGroup,
      updateExistingGroup,
      toggleEditMode,
      setSuccess,
      setError,
      clearNotifications
    } = this.props

    return (
      <div style={{ allign: 'top' }}>
        Edit group: {group.name}
        <IconButton
          aria-label="Delete"
          onClick={(event) =>
            deleteExistingGroup(event, {
              group: this.state,
              deleteGroup,
              setSuccess,
              setError,
              clearNotifications
            })
          }
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
        <p>Edit group name</p>
        <TextField
          inputProps={{ className: `edit-group-no__${group.id}__name` }}
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <p>Change topic</p>
        <TopicSelect
          topics={topics}
          onTopicSelectChange={this.handleTopicChange}
          groupTopicID={this.state.topicId}
          className="edit-group-form-topic__selector"
        />
        <p>Add new students</p>
        <TextField
          inputProps={{ className: `edit-group-no__${group.id}__students` }}
          value={this.state.studentIds}
          onChange={this.handleStudentChange}
          multiline
          rows="8"
        />
        <p>Change instructor</p>
        {/*<TextField
          inputProps={{ className: `edit-group-no__${group.id}__instructor` }}
          value={this.state.instructorId || ''}
          onChange={this.handleInstructorChange}
        />*/}
        <Button
          style={{ marginLeft: '10px', height: '30px', float: 'right' }}
          color="primary"
          variant="contained"
          onClick={(event) =>
            updateCreatedGroup(event, {
              group: this.state,
              updateExistingGroup,
              toggleEditMode,
              setSuccess,
              setError,
              clearNotifications
            })
          }
          className={`edit-group-no__${group.id}__save-button`}
        >
          Save
        </Button>
        <Button
          style={{ marginLeft: '10px', height: '30px', float: 'right' }}
          color="primary"
          variant="contained"
          onClick={() => toggleEditMode()}
          className={`edit-group-no__${group.id}__cancel-button`}
        >
          Cancel
        </Button>
      </div>
    )
  }
}

const mapStateToPropsForm = (state) => ({
  topics: state.topicListPage.topics,
  users: state.groupPage.users
})

const mapDispatchToPropsForm = {
  onTopicSelectChange: groupManagementActions.updateGroupTopicID,
  updateExistingGroup: groupManagementActions.updateExistingGroup,
  deleteGroup: groupManagementActions.deleteGroup,
  setError: notificationActions.setError,
  setSuccess: notificationActions.setSuccess
}

export default connect(
  mapStateToPropsForm,
  mapDispatchToPropsForm
)(SingleGroupEdit)
