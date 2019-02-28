import autocompleteService from '../../services/autocomplete'

const updateCreateGroupFormName = (groupName) => ({
  type: 'UPDATE_CREATE_GROUP_FORM_NAME',
  payload: groupName
})

const updateStudentsForm = (students) => ({
  type: 'UPDATE_STUDENTS_FORM',
  payload: students
})

const updateGroupTopicID = (topicID) => ({
  type: 'UPDATE_TOPIC_ID',
  payload: topicID
})

const updateGroupInstructorID = (groupInstructorID) => ({
  type: 'UPDATE_INSTRUCTOR_ID',
  payload: groupInstructorID
})

const updateGroupConfigurationID = (groupConfigurationID) => ({
  type: 'UPDATE_GROUP_CONFIGURATION_ID',
  payload: groupConfigurationID
})

const createGroupSuccsess = (newGroup) => ({
  type: 'CREATE_GROUP_SUCCSESS',
  payload: newGroup
})

const setGroups = (groups) => ({
  type: 'SET_GROUPS',
  payload: groups
})

const deleteFromGroup = (group) => ({
  type: 'DELETE_FROM_GROUP',
  payload: group
})

const updateExistingGroup = (group) => ({
  type: 'UPDATE_EXISTING_GROUP',
  payload: group
})

const deleteGroup = (group) => ({
  type: 'DELETE_GROUP',
  payload: group
})

const setUsers = (users) => ({
  type: 'SET_USERS',
  payload: users
})

const fetchUserAutocompleteRequest = () => ({
  type: 'FETCH_USER_AUTOCOMPLETE_REQUEST'
})

const fetchUserAutocompleteSuccess = (suggestions) => ({
  type: 'FETCH_USER_AUTOCOMPLETE_SUCCESS',
  payload: suggestions
})

const fetchUserAutocompleteFailed = () => ({
  type: 'FETCH_USER_AUTOCOMPLETE_SUCCESS'
})

const fetchUserAutocompleteSuggestions = (partialName) => {
  return async (dispatch) => {
    dispatch(fetchUserAutocompleteRequest())
    try {
      const suggestions = await autocompleteService.findUserByPartialName(
        partialName
      )
      dispatch(fetchUserAutocompleteSuccess(suggestions))
    } catch (err) {
      console.error(
        `Failed to fetch user autocomplete for name ${partialName}`,
        err
      )
      dispatch(fetchUserAutocompleteFailed())

      // normally the pattern has been so far to catch this in the UI but we
      // want to set the loading to false so we re-throw the error for the UI :)
      throw err
    }
  }
}

export default {
  updateCreateGroupFormName,
  updateStudentsForm,
  updateGroupTopicID,
  updateGroupInstructorID,
  updateGroupConfigurationID,
  createGroupSuccsess,
  setGroups,
  deleteFromGroup,
  updateExistingGroup,
  deleteGroup,
  setUsers,
  fetchUserAutocompleteSuggestions
}
