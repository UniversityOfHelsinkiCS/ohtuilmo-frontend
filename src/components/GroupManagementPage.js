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

import topicListPageActions from '../reducers/actions/topicListPageActions'
import adminPageActions from '../reducers/actions/adminPageActions'
import notificationActions from '../reducers/actions/notificationActions'
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
      />
    </div>
  )
}

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

const ConfigurationSelect = ({
  groupConfigurationID,
  onConfigurationChange,
  configurations
}) => {
  return (
    <Select
      value={groupConfigurationID}
      onChange={(e) => onConfigurationChange(e.target.value)}
    >
      {configurations.map((configuration) => (
        <MenuItem key={configuration.id} value={configuration.id}>
          {configuration.name}
        </MenuItem>
      ))}
    </Select>
  )
}

const NameInput = ({ value, onChange, ...textFieldProps }) => (
  <TextField
    value={value}
    onChange={(e) => onChange(e.target.value)}
    variant="standard"
    {...textFieldProps}
  />
)

const SingleGroupView = ({ group }) => {
  return (
    /*     <Paper key={group.id} style={{ padding: 10, float: 'left' }}> */
    <div style={{ align: 'top' }}>
      {group.name}

      <div>
        <p>students</p>

        {group.studentIds.map((student) => (
          <div key={student}>
            {student}
            <IconButton
              aria-label="Delete"
              onClick={() => console.log('nappi')}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </div>
          /* Mahollisesti delete nappulla tai kentät mitä voi muokata */
        ))}
        <p>Instructor</p>
        <div>
          {group.instructorId}
          <IconButton aria-label="Delete" onClick={() => console.log('nappi')}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>

        {/*         <Button
          style={{ marginRight: '10px', height: '30px' }}
          color="primary"
          variant="contained"
        >
          Edit
        </Button> */}
      </div>
    </div>
    /*     </Paper> */
  )
}

const SingleGroupEdit = ({ group }) => {
  return (
    <div style={{ allign: 'top' }}>
      Edit group: {group.name}
      <p>Edit group name</p>
      <Button
        style={{ marginLeft: '10px', height: '30px', float: 'right' }}
        color="primary"
        variant="contained"
      >
        Edit
      </Button>
      {/* <FormInput lable="Group name"> */}
      <NameInput />
      {/* </FormInput> */}
      <p>Add new students</p>
      <Button
        style={{ marginLeft: '10px', height: '30px', float: 'right' }}
        color="primary"
        variant="contained"
      >
        Edit
      </Button>
      {/*  <FormInput label="Students"> */}
      <StudentInput />
      {/* </FormInput> */}
      <p>Add instructor</p>
      <Button
        style={{ marginLeft: '10px', height: '30px', float: 'right' }}
        color="primary"
        variant="contained"
      >
        Edit
      </Button>
      {/* <FormInput label="Instructor"> */}
      <NameInput />
      {/* </FormInput> */}
    </div>
  )
}

const GroupManagementForm = ({ groups, groupConfigurationID }) => {
  console.log('group config id', groupConfigurationID)
  const filteredGroups = groups.filter(
    (group) => group.configurationId === groupConfigurationID
  )

  console.log('filtered', filteredGroups)

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
                      <SingleGroupView group={group} />
                    </td>
                    <td style={{ verticalAlign: 'top', padding: '25px' }}>
                      <SingleGroupEdit group={group} />
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
    console.log(createdGroup)

    props.setSuccess('Group saved!')
    setTimeout(() => {
      props.clearNotifications()
    }, 3000)
  } catch (e) {
    props.setError(`Failed to save! ${e.response.data.error}`)
    setTimeout(() => {
      props.clearNotifications()
    }, 3000)
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
              />
            </FormInput>

            <FormInput label="Group name">
              <NameInput value={groupName} onChange={onNameChangeForm} />
            </FormInput>

            <FormInput label="Students">
              <StudentInput value={students} onChange={onStudentFormChange} />
            </FormInput>

            <FormInput label="Instructor">
              <NameInput
                value={groupInstructorID}
                onChange={onInstructorIdChange}
              />
            </FormInput>
          </tbody>
        </table>
        <Button
          style={{ marginRight: '10px', height: '40px' }}
          color="primary"
          variant="contained"
          type="submit"
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
  configurations: state.adminPage.configurations
})

const mapDispatchToPropsForm = {
  onNameChangeForm: groupManagementActions.updateCreateGroupFormName,
  onStudentFormChange: groupManagementActions.updateStudentsForm,
  onTopicSelectChange: groupManagementActions.updateGroupTopicID,
  onInstructorIdChange: groupManagementActions.updateGroupInstructorID,
  onConfigurationChange: groupManagementActions.updateGroupConfigurationID,
  createGroupSuccsess: groupManagementActions.createGroupSuccsess,
  updateTopicsForm: topicListPageActions.updateTopics,
  updateConfigurations: adminPageActions.updateConfigurations,
  ...notificationActions
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
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
    }
  }

  async componentDidMount() {
    try {
      const fetchedTopics = await topicService.getAllActive()

      const fetchedConfiguration = await configurationService.getAll()

      const fetchedGroups = await groupManagementService.get()
      //topic filter configin omille

      this.props.setGroups(fetchedGroups)
      this.props.updateTopics(fetchedTopics)
      this.props.setConfigurations(fetchedConfiguration.configurations)
    } catch (e) {
      this.props.setError('Some error happened')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
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

        {/* <Paper elevation={1} style={{ padding: '1rem 1.5rem' }}> */}
        <ConnectedGroupManagementForm />
        {/* </Paper> */}

        {/*         {this.props.topics.map((topic) => (
          <div key={topic.id}>
            <Paper elevation={1} style={{ padding: '1rem 1.5rem' }}>
              <ConnectedGroupManagementForm group={topic} />
            </Paper>
            <p />
          </div>
        ))} */}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  topics: state.topicListPage.topics,
  configurations: state.adminPage.configurations,
  groups: state.groupPage.groups
})

const mapDispatchToProps = {
  updateTopics: topicListPageActions.updateTopics,
  setConfigurations: adminPageActions.setConfigurations,
  setGroups: groupManagementActions.setGroups,
  ...notificationActions
}

const ConnectedGroupManagementPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupManagementPage)

export default ConnectedGroupManagementPage
