import React from 'react'
import { connect } from 'react-redux'

import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import topicListPageActions from '../../reducers/actions/topicListPageActions'
import adminPageActions from '../../reducers/actions/adminPageActions'
import * as notificationActions from '../../reducers/actions/notificationActions'
import groupManagementActions from '../../reducers/actions/groupManagementActions'

const ConfigurationSelect = ({
  groupConfigurationID,
  onConfigurationChange,
  configurations
}) => {
  return (
    <Select
      className="configuration-selector"
      value={groupConfigurationID}
      onChange={(e) => onConfigurationChange(e.target.value)}
    >
      {configurations.map((configuration) => (
        <MenuItem
          key={configuration.id}
          value={configuration.id}
          className={`configuration-${configuration.id}`}
        >
          {configuration.name}
        </MenuItem>
      ))}
    </Select>
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
)(ConfigurationSelect)
