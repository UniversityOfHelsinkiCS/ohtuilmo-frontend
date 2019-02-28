import React from 'react'
import { connect } from 'react-redux'

import Paper from '@material-ui/core/Paper'

import topicListPageActions from '../../reducers/actions/topicListPageActions'
import adminPageActions from '../../reducers/actions/adminPageActions'
import * as notificationActions from '../../reducers/actions/notificationActions'
import groupManagementActions from '../../reducers/actions/groupManagementActions'

import GroupViewer from './GroupViewer'

const GroupManagementForm = ({
  groups,
  groupConfigurationID,
  deleteFromGroupAction,
  topics,
  users,
  deleteGroup,
  setSuccess,
  setError,
  clearNotifications
}) => {
  const filteredGroups = groups.filter(
    (group) => group.configurationId === groupConfigurationID
  )

  return (
    <div>
      {filteredGroups.map((group) => {
        return (
          <div
            key={group.id}
            style={{ clear: 'both', display: 'table', padding: '15px' }}
          >
            <Paper>
              <table>
                <tbody>
                  <tr>
                    <td style={{ verticalAlign: 'top', padding: '25px' }}>
                      <GroupViewer
                        group={group}
                        topics={topics}
                        users={users}
                        deleteFromGroupAction={deleteFromGroupAction}
                        deleteGroup={deleteGroup}
                        setSuccess={setSuccess}
                        setError={setError}
                        clearNotifications={clearNotifications}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </Paper>
          </div>
        )
      })}
    </div>
  )
}

// Todo: these were copypasted from GroupManagementPage - figure out what props
//       are actually used
const mapStateToPropsForm = (state) => ({
  groupName: state.groupPage.groupName,
  students: state.groupPage.students,
  groupTopicID: state.groupPage.groupTopicID,
  groupInstructorID: state.groupPage.groupInstructorID,
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
  onInstructorIdChange: groupManagementActions.updateGroupInstructorID,
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
)(GroupManagementForm)
