import React from 'react'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import groupManagementService from '../../services/groupManagement'

import topicListPageActions from '../../reducers/actions/topicListPageActions'
import adminPageActions from '../../reducers/actions/adminPageActions'
import * as notificationActions from '../../reducers/actions/notificationActions'
import groupManagementActions from '../../reducers/actions/groupManagementActions'

import TopicSelect from './TopicSelect'
import AutocompletedUserSelect from './AutocompletedUserSelect'

const FormInput = ({ label, children }) => (
  <tr>
    <td>
      <Typography variant="caption">{label}</Typography>
    </td>
    <td>{children}</td>
  </tr>
)

const StudentInput = ({ value, onChange }) => {
  return (
    <div>
      <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        multiline
        rows="8"
        inputProps={{ className: 'create-group-form__student-input' }}
      />
    </div>
  )
}

const NameInput = ({ value, onChange, inputProps, ...textFieldProps }) => (
  <TextField
    value={value}
    onChange={(e) => onChange(e.target.value)}
    variant="standard"
    inputProps={inputProps}
    {...textFieldProps}
  />
)

const saveGroup = async (event, props) => {
  event.preventDefault()

  const {
    groupName,
    students,
    groupTopicID,
    groupInstructor,
    groupConfigurationID
  } = props

  const splitStudents = students
    .split(/[;, \n]/)
    .filter((str) => !!str)
    .map((student) => {
      if (student.length < 9) {
        return '0' + student.trim()
      } else {
        return student.trim()
      }
    })

  try {
    const createdGroup = await groupManagementService.create({
      name: groupName,
      topicId: groupTopicID,
      configurationId: groupConfigurationID,
      instructorId: groupInstructor ? groupInstructor.student_number : '',
      studentIds: splitStudents
    })
    props.createGroupSuccsess(createdGroup)

    props.setSuccess('Group saved!')
  } catch (e) {
    props.setError(`Failed to save! ${e.response.data.error}`)
  }
}

const GroupCreationForm = ({
  groupName,
  onNameChangeForm,
  students,
  onStudentFormChange,
  groupInstructor,
  onInstructorChange,
  topics,
  onTopicSelectChange,
  groupTopicID,
  groupConfigurationID,
  createGroupSuccsess,
  setSuccess,
  setError,
  clearNotifications
}) => {
  return (
    <div>
      <form
        onSubmit={(event) =>
          saveGroup(event, {
            groupName,
            students,
            groupTopicID,
            groupInstructor,
            groupConfigurationID,
            createGroupSuccsess,
            setSuccess,
            setError,
            clearNotifications
          })
        }
      >
        <table>
          <tbody>
            <FormInput label="Topic">
              <TopicSelect
                topics={topics}
                onTopicSelectChange={onTopicSelectChange}
                groupTopicID={groupTopicID}
                className="create-group-form-topic__selector"
              />
            </FormInput>

            <FormInput label="Group name">
              <NameInput
                value={groupName}
                onChange={onNameChangeForm}
                inputProps={{ className: 'create-group-form__name' }}
              />
            </FormInput>

            <FormInput label="Students">
              <StudentInput value={students} onChange={onStudentFormChange} />
            </FormInput>

            <FormInput label="Instructor">
              <AutocompletedUserSelect
                className="create-group-form__instructor"
                classNamePrefix="create-group-form__instructor"
                selectedUser={groupInstructor}
                onSelectedUserChange={onInstructorChange}
              />
            </FormInput>
          </tbody>
        </table>
        <Button
          style={{ marginRight: '10px', height: '40px' }}
          color="primary"
          variant="contained"
          type="submit"
          className="create-group-submit"
        >
          Add group
        </Button>
      </form>
    </div>
  )
}

// Todo: these were copypasted from GroupManagementPage - figure out what props
//       are actually used
const mapStateToPropsForm = (state) => ({
  groupName: state.groupPage.groupName,
  students: state.groupPage.students,
  groupTopicID: state.groupPage.groupTopicID,
  groupInstructor: state.groupPage.groupInstructor,
  groupConfigurationID: state.groupPage.groupConfigurationID,
  groups: state.groupPage.groups,
  topics: state.topicListPage.topics,
  configurations: state.adminPage.configurations,
  users: state.groupPage.users
})

const mapDispatchToPropsForm = {
  onNameChangeForm: groupManagementActions.updateCreateGroupFormName,
  onStudentFormChange: groupManagementActions.updateStudentsForm,
  onTopicSelectChange: groupManagementActions.updateGroupTopicID,
  onInstructorChange: groupManagementActions.updateGroupInstructor,
  onConfigurationChange: groupManagementActions.updateGroupConfigurationID,
  deleteFromGroupAction: groupManagementActions.deleteFromGroup,
  updateExistingGroup: groupManagementActions.updateExistingGroup,
  createGroupSuccsess: groupManagementActions.createGroupSuccsess,
  deleteGroup: groupManagementActions.deleteGroup,
  updateTopicsForm: topicListPageActions.updateTopics,
  updateConfigurations: adminPageActions.updateConfigurations,
  setError: notificationActions.setError,
  setSuccess: notificationActions.setSuccess
}

export default connect(
  mapStateToPropsForm,
  mapDispatchToPropsForm
)(GroupCreationForm)
