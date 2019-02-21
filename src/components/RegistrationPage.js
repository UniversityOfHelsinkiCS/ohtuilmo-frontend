import React from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactDragList from 'react-drag-list'
// MUI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
// services
import topicService from '../services/topic'
import userService from '../services/user'
import registrationService from '../services/registration'
import configurationService from '../services/configuration'
// components
import LoadingSpinner from '../components/common/LoadingSpinner'
import TopicDialog from './TopicDialog'
import UserDetails from './UserDetails'
import './RegistrationPage.css'
// Actions
import registrationPageActions from '../reducers/actions/registrationPageActions'
import * as notificationActions from '../reducers/actions/notificationActions'

class RegistrationPage extends React.Component {
  async componentWillMount() {
    try {
      if (window.localStorage.getItem('loggedInUser') === null) {
        this.props.history.push('/')
      } else {
        const token = JSON.parse(window.localStorage.getItem('loggedInUser'))
        if (token === undefined || token === null) {
          this.props.history.push('/')
        }
      }
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Some error happened', 3000)
    }
  }

  componentDidMount() {
    this.fetchTopics()
    this.fetchQuestions()
  }

  async fetchQuestions() {
    try {
      const fetchedConfiguration = await configurationService.getActive()
      let fetchedQuestions =
        fetchedConfiguration.registration_question_set.questions
      fetchedQuestions = fetchedQuestions ? fetchedQuestions : []
      this.props.updateQuestions(fetchedQuestions)
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Error fetching questions', 3000)
    }
  }

  async fetchTopics() {
    try {
      const fetchedTopics = await topicService
        .getAllActive()
        .then(function(defs) {
          return defs
        })

      this.props.updateTopics(fetchedTopics)
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Error fetching topics', 3000)
    }
  }

  handleUpdate = (evt, updated) => {
    this.props.updateTopics(updated)
  }

  updateUser = async () => {
    const user = {
      student_number: this.props.user.user.student_number,
      email: { email: this.props.email }
    }
    try {
      const response = await userService.update(user)
      var loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
      loggedInUser['user'] = response.user
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
    } catch (e) {
      throw e
    }
  }

  submitRegistration = async (e) => {
    e.preventDefault()

    const answer = window.confirm(
      'Are you sure that you have ordered topics according to your preference?'
    )
    if (!answer) return

    try {
      await this.updateUser()
      await registrationService.create({
        questions: this.props.questions,
        preferred_topics: this.props.topics
      })
      this.props.setSuccess('Registration submitted', 15000)
      this.props.history.push('/')
    } catch (e) {
      console.log(e)
      if (e.response.data.error === 'student already registered') {
        this.props.setError(
          'You have already registered for this course',
          15000
        )
      } else if (e.response.data.error === 'missing email') {
        this.props.setError('Email is missing', 5000)
      } else {
        this.props.setError('Error happened', 5000)
      }
    }
  }

  render() {
    if (!this.props.projectOpen) {
      return <Redirect to="/" />
    }

    if (!this.props.user) {
      return <LoadingSpinner />
    }

    const questions = this.props.questions.map((item, idx) => (
      <Card style={{ marginBottom: '10px' }} key={idx}>
        <CardContent>
          <p>{item.question}</p>
          {item.type === 'scale' ? (
            <div>
              <Select
                value={
                  this.props.questions[idx].answer === undefined
                    ? -1
                    : this.props.questions[idx].answer
                }
                onChange={(event) =>
                  this.props.updateQuestionAnswer(event.target.value, idx)
                }
              >
                <MenuItem value={-1} disabled>
                  <em>Pick a number</em>
                </MenuItem>
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
            </div>
          ) : null}
          {item.type === 'text' ? (
            <Input
              value={this.props.questions[idx].answer}
              onChange={(event) =>
                this.props.updateQuestionAnswer(event.target.value, idx)
              }
              placeholder="Answer"
              fullWidth
              multiline
              rowsMax="3"
              required
            />
          ) : null}
        </CardContent>
      </Card>
    ))

    const indexes = this.props.topics.map((item, idx) => (
      <Card key={idx} className="dragndrop-index">
        {idx + 1}
      </Card>
    ))

    return (
      <div>
        <div
          style={{
            fontWeight: 'bold',
            color: 'green',
            marginBottom: 20
          }}
        >
          {this.props.projectInfo}
        </div>
        <form onSubmit={this.submitRegistration}>
          <div className="section registration-form">
            <h2 className="landingpage-header">User details</h2>
            <UserDetails />
            <p>Please fill your email</p>
            <div>
              <TextField
                type="email"
                required
                label="Email"
                margin="normal"
                style={{ width: '250px', marginTop: 0 }}
                value={this.props.email}
                onChange={(e) => this.props.updateEmail(e.target.value)}
              />
            </div>
            <h2>Topics</h2>
            <div
              style={{
                fontWeight: 'bold',
                marginBottom: 20,
                border: 'solid',
                padding: 10,
                borderRadius: 10
              }}
            >
              Set the order of the list of topics according to your preference
              (1 = favorite) by dragging and dropping, click to expand details
            </div>
            <div className="dragndrop-container">
              <div className="dragndrop-indexes-container">{indexes}</div>
              <ReactDragList
                className="dragndrop-list"
                handles={false}
                dataSource={this.props.topics}
                onUpdate={this.handleUpdate}
                rowKey="id"
                row={(topic) => (
                  <TopicDialog topic={topic} key={topic.content.title} />
                )}
              />
            </div>
          </div>
          <div className="section">
            <h2>Details</h2>
            <p>Please answer all questions</p>
            {questions}
          </div>
          <Button
            type="submit"
            variant="outlined"
            style={{ backgroundColor: 'white' }}
          >
            Submit
          </Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.loginPage.user,
    isLoading: state.app.isLoading,
    topics: state.registrationPage.topics,
    questions: state.registrationPage.questions,
    email: state.registrationPage.email,
    projectOpen: state.registrationManagement.projectRegistrationOpen,
    projectInfo: state.registrationManagement.projectRegistrationInfo
  }
}

const mapDispatchToProps = {
  ...registrationPageActions,
  setError: notificationActions.setError,
  setSuccess: notificationActions.setSuccess
}

const ConnectedRegistrationPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationPage)

export default withRouter(ConnectedRegistrationPage)
