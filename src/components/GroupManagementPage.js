import React from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import topicService from '../services/topic'
import configurationService from '../services/configuration'
import groupManagementService from '../services/groupManagement'
import userService from '../services/user'

import topicListPageActions from '../reducers/actions/topicListPageActions'
import adminPageActions from '../reducers/actions/adminPageActions'
import * as notificationActions from '../reducers/actions/notificationActions'
import groupManagementActions from '../reducers/actions/groupManagementActions'

const FormInput = ({ label, children }) => (
  <tr>
    <td>
      <Typography variant="caption">{label}</Typography>
    </td>
    <td>{children}</td>
  </tr>
)

const ConfigurationSelectWrapper = ({ label, children }) => (
  <div style={{ padding: 20 }}>
    <Typography variant="caption">{label}</Typography>
    {children}
  </div>
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

const NameInput = ({ value, onChange, inputProps, ...textFieldProps }) => (
  <TextField
    value={value}
    onChange={(e) => onChange(e.target.value)}
    variant="standard"
    inputProps={inputProps}
    {...textFieldProps}
  />
)

const SingleGroupView = ({
  group,
  topics,
  users,
  deleteFromGroupAction,
  toggleEditMode,
  setSuccess,
  setError,
  clearNotifications
}) => {
  console.log(group)

  const thisTopic = topics.filter((topic) => topic.id === group.topicId)

  const topicName = thisTopic[0].content.title

  const getUserNames = (user) => {
    const namedUser = users.filter(
      (userIterator) => userIterator.student_number === user
    )[0]
    return `${namedUser.first_names} ${namedUser.last_name} (${user})`
  }

  const getGroupInstructor = (groupId) => {
    if (group.instructorId === null) {
      return <div>No instructor assigned</div>
    } else {
      return (
        <div>
          {getUserNames(group.instructorId)}
          <IconButton
            aria-label="Delete"
            onClick={(event) =>
              deleteFromGroupInstructor(event, {
                group,
                deleteFromGroupAction,
                setSuccess,
                setError,
                clearNotifications
              })
            }
            className={`edit-group-no__${groupId}__delete-instructor`}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      )
    }
  }

  return (
    <div
      className={`view-group-no__${group.id}__container`}
      style={{ align: 'top' }}
    >
      <div className="group-name">{group.name}</div>

      <div>
        <div className="group-topic">
          <p>Topic</p>

          {topicName}
        </div>

        <div className="group-students">
          <p>Students</p>

          {group.studentIds.map((student, index) => (
            <div key={student}>
              {getUserNames(student)}

              <IconButton
                aria-label="Delete"
                onClick={(event) =>
                  deleteFromGroupStudent(event, {
                    group,
                    student,
                    deleteFromGroupAction,
                    setSuccess,
                    setError,
                    clearNotifications
                  })
                }
                className={`edit-group-no__${
                  group.id
                }__delete-student-no__${index}`}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </div>
          ))}
        </div>

        <div className="group-instructor">
          <p>Instructor</p>
          {getGroupInstructor(group.id)}
        </div>
      </div>

      <Button
        style={{ marginLeft: '10px', height: '30px', float: 'right' }}
        color="primary"
        variant="contained"
        onClick={() => toggleEditMode()}
        className={`enable-edit-group-no__${group.id}`}
      >
        Edit
      </Button>
    </div>
  )
}

const deleteFromGroupStudent = async (event, props) => {
  event.preventDefault()

  const confirm = window.confirm(
    `Are you sure you want to delete student ${props.student} from a group ${
      props.group.name
    }? `
  )

  if (!confirm) {
    return
  }

  const {
    id,
    name,
    topicId,
    studentIds,
    instructorId,
    configurationId
  } = props.group

  const removedStudents = studentIds
    .map((studentmap) => studentmap.trim())
    .filter((studentmap) => studentmap !== props.student)

  try {
    const updatedGroup = await groupManagementService.put({
      id: id,
      name: name,
      topicId: topicId,
      configurationId: configurationId,
      instructorId: instructorId,
      studentIds: removedStudents
    })
    props.deleteFromGroupAction(updatedGroup)

    props.setSuccess('Student deleted!')
  } catch (e) {
    console.log(e)
    props.setError(`Failed to deleted student! ${e.response.data.error}`)
  }
}

const deleteFromGroupInstructor = async (event, props) => {
  event.preventDefault()

  const confirm = window.confirm(
    `Are you sure you want to delete instructor ${
      props.group.instructorId
    } from a group ${props.group.name}? `
  )

  if (!confirm) {
    return
  }

  const { id, name, topicId, studentIds, configurationId } = props.group

  try {
    const updatedGroup = await groupManagementService.put({
      id: id,
      name: name,
      topicId: topicId,
      configurationId: configurationId,
      instructorId: '',
      studentIds: studentIds
    })
    props.deleteFromGroupAction(updatedGroup)

    props.setSuccess('Instructor deleted!')
  } catch (e) {
    console.log(e)
    props.setError(`Failed to delete instructor! ${e.response.data.error}`)
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

  const answer = window.confirm('Are you sure you want to delete this group?')
  if (!answer) return

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
    const group = this.state

    return (
      <div style={{ allign: 'top' }}>
        Edit group: {this.props.group.name}
        <IconButton
          aria-label="Delete"
          onClick={(event) =>
            deleteExistingGroup(event, {
              group,
              deleteGroup: this.props.deleteGroup,
              setSuccess: this.props.setSuccess,
              setError: this.props.setError,
              clearNotifications: this.props.clearNotifications
            })
          }
          className={`edit-group-no__${group.id}__delete-button`}
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
          topics={this.props.topics}
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
        <TextField
          inputProps={{ className: `edit-group-no__${group.id}__instructor` }}
          value={this.state.instructorId || ''}
          onChange={this.handleInstructorChange}
        />
        <Button
          style={{ marginLeft: '10px', height: '30px', float: 'right' }}
          color="primary"
          variant="contained"
          onClick={(event) =>
            updateCreatedGroup(event, {
              group,
              updateExistingGroup: this.props.updateExistingGroup,
              toggleEditMode: this.props.toggleEditMode,
              setSuccess: this.props.setSuccess,
              setError: this.props.setError,
              clearNotifications: this.props.clearNotifications
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
          onClick={() => this.props.toggleEditMode()}
          className={`edit-group-no__${group.id}__cancel-button`}
        >
          Cancel
        </Button>
      </div>
    )
  }
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

class GroupViewer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false
    }
  }

  toggleEditMode = () => {
    this.setState((prevState) => ({
      editMode: !prevState.editMode
    }))
    if (this.state.editMode) {
      this.props.setSuccess(
        `Editing for group ${this.props.group.name} disabled!`
      )
    } else {
      this.props.setSuccess(
        `Editing for group ${this.props.group.name} enabled!`
      )
    }
  }

  render() {
    if (this.state.editMode) {
      return (
        <ConnectedSingleGroupEdit
          group={this.props.group}
          toggleEditMode={this.toggleEditMode}
          deleteGroup={this.props.deletGroup}
        />
      )
    } else {
      return (
        <div>
          <SingleGroupView
            group={this.props.group}
            topics={this.props.topics}
            users={this.props.users}
            deleteFromGroupAction={this.props.deleteFromGroupAction}
            toggleEditMode={this.toggleEditMode}
            setSuccess={this.props.setSuccess}
            setError={this.props.setError}
            clearNotifications={this.props.clearNotifications}
          />
        </div>
      )
    }
  }
}

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

const saveGroup = async (event, props) => {
  event.preventDefault()

  const {
    groupName,
    students,
    groupTopicID,
    groupInstructorID,
    groupConfigurationID
  } = props

  const splitStudents = students
    .split(/[;,\n]/)
    .map((student) => student.trim())
    .filter((str) => !!str)

  try {
    const createdGroup = await groupManagementService.create({
      name: groupName,
      topicId: groupTopicID,
      configurationId: groupConfigurationID,
      instructorId: groupInstructorID,
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
  groupInstructorID,
  onInstructorIdChange,
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
            groupInstructorID,
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
              <NameInput
                value={groupInstructorID}
                onChange={onInstructorIdChange}
                inputProps={{ className: 'create-group-form__instructor' }}
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

const ConnectedGroupCreationForm = connect(
  mapStateToPropsForm,
  mapDispatchToPropsForm
)(GroupCreationForm)

const ConnectedGroupManagementForm = connect(
  mapStateToPropsForm,
  mapDispatchToPropsForm
)(GroupManagementForm)

const ConnectedConfigurationSelect = connect(
  mapStateToPropsForm,
  mapDispatchToPropsForm
)(ConfigurationSelect)

const ConnectedSingleGroupEdit = connect(
  mapStateToPropsForm,
  mapDispatchToPropsForm
)(SingleGroupEdit)

class GroupManagementPage extends React.Component {
  componentWillMount() {
    try {
      if (window.localStorage.getItem('loggedInUser') === null) {
        window.location.replace(process.env.PUBLIC_URL + '/')
      } else {
        const token = JSON.parse(window.localStorage.getItem('loggedInUser'))
        if (!token.user.admin || token === undefined || token === null) {
          window.location.replace(process.env.PUBLIC_URL + '/')
        }
      }
    } catch (e) {
      console.log('error happened', e)
      this.props.setError('Some error happened')
    }
  }

  async componentDidMount() {
    try {
      const fetchedTopics = await topicService.getAllActive()

      const fetchedConfiguration = await configurationService.getAll()

      const fetchedGroups = await groupManagementService.get()

      const fetchedUsers = await userService.get()

      this.props.setUsers(fetchedUsers)

      this.props.setGroups(fetchedGroups)
      this.props.updateTopics(fetchedTopics)
      this.props.setConfigurations(fetchedConfiguration.configurations)
    } catch (e) {
      this.props.setError('Some error happened')
    }
  }

  render() {
    return (
      <div>
        <h2>Administration</h2>
        <h3>Group Management</h3>

        <ConfigurationSelectWrapper label="Select configuration">
          <ConnectedConfigurationSelect props={this.props} />
        </ConfigurationSelectWrapper>

        <Paper elevation={2} style={{ padding: '1rem 1.5rem' }}>
          <h4>Create group</h4>
          <ConnectedGroupCreationForm />
        </Paper>

        <p />

        <h4>Created groups</h4>

        <ConnectedGroupManagementForm />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  topics: state.topicListPage.topics,
  configurations: state.adminPage.configurations,
  groups: state.groupPage.groups,
  users: state.groupPage.users
})

const mapDispatchToProps = {
  updateTopics: topicListPageActions.updateTopics,
  setConfigurations: adminPageActions.setConfigurations,
  setGroups: groupManagementActions.setGroups,
  setUsers: groupManagementActions.setUsers,
  setError: notificationActions.setError,
  setSuccess: notificationActions.setSuccess
}

const ConnectedGroupManagementPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupManagementPage)

export default ConnectedGroupManagementPage
