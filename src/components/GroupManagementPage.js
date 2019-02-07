import React from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'

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

const ConfigurationSelect = (props) => {
  return (
    <Select
      value={props.groupConfigurationID}
      onChange={(e) => props.onConfigurationChange(e.target.value)}
    >
      {props.configurations.map((config) => (
        <MenuItem key={config.id} value={config.id}>
          {' '}
          {config.name}
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

const GroupManagementForm = ({ groups }) => {
  return (
    <div>
      {groups.map((group) => {
        return (
          <Paper key={group.id}>
            {group.name}
            <p>students</p>
            {group.studentIds.map((student) => (
              <p key={student}>{student}</p>
            ))}
            <p>Instructor</p>
            <p>{group.instructorId}</p>
          </Paper>
        )
      })}
    </div>
  )
}

const saveGroup = async (event, props) => {
  event.preventDefault()
  console.log('saveGroup', props)

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
    console.log('error happened', e)
    props.setError('Failed to save!')
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
  async componentWillMount() {
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
      const fetchedConfiguration = await configurationService.getActive()

      //topic filter configin omille

      this.props.updateTopics(fetchedTopics)
      this.props.setConfigurations([fetchedConfiguration])
    } catch (e) {
      console.log('props fetchedtopics', e)
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

        {this.props.topics.map((topic) => (
          <div key={topic.id}>
            <Paper elevation={1} style={{ padding: '1rem 1.5rem' }}>
              <ConnectedGroupManagementForm group={topic} />
            </Paper>
            <p />
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  topics: state.topicListPage.topics,
  configurations: state.adminPage.configurations
})

const mapDispatchToProps = {
  updateTopics: topicListPageActions.updateTopics,
  setConfigurations: adminPageActions.setConfigurations,
  ...notificationActions
}

const ConnectedGroupManagementPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupManagementPage)

export default ConnectedGroupManagementPage
