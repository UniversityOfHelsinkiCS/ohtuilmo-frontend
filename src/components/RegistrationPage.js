import React from 'react'
import topicService from '../services/topic'
import userService from '../services/user'
import { connect } from 'react-redux'
import './RegistrationPage.css'
import ReactDragList from 'react-drag-list'
import TopicDialog from './TopicDialog'
// MUI
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
// Actions
import registrationPageActions from '../reducers/actions/registrationPageActions'
import notificationActions from '../reducers/actions/notificationActions'
import UserDetails from './UserDetails'

class RegistrationPage extends React.Component {
  componentDidMount() {
    this.fetchTopics()
    this.fetchQuestions()
  }

  async fetchQuestions() {
    this.props.updateQuestions(testQuestions)
  }

  async fetchTopics() {
    try {
      const fetchedTopics = await topicService
        .getAllActive()
        .then(function(defs) {
          return defs
        })
      //sorts topics based on timestamp
      const sortedTopics = fetchedTopics.sort((t1, t2) =>
        t1.createdAt > t2.createdAt ? -1 : t1.createdAt < t2.createdAt ? 1 : 0
      )
      this.props.updateTopics(sortedTopics)
    } catch (e) {
      console.log('error happened', e.response)
      this.props.setError('Error fetching topics')
      setTimeout(() => {
        this.props.clearNotifications()
      }, 3000)
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
      console.log(e)
    }
  }

  render() {
    let questions = this.props.questions.map((item, idx) => (
      <Card style={{ marginBottom: '10px' }} key={idx}>
        <CardContent>
          <InputLabel>Question {idx}:</InputLabel>
          <p>{item.question}</p>
          {item.type === 'scale' ? (
            <div>
              <Select
                value={
                  this.props.questions[idx].answer
                    ? this.props.questions[idx].answer
                    : 0
                }
                onChange={(event) =>
                  this.props.updateQuestionAnswer(event.target.value, idx)
                }
              >
                <MenuItem value='' disabled>
                  <em>Pick a number</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
              <FormHelperText>
                1=None 2=Basics 3=Average 4=Good 5=Excellent
              </FormHelperText>
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

    let indexes = this.props.topics.map((item, idx) => (
      <Card key={idx} className="dragndrop-index">
        {idx + 1}
      </Card>
    ))

    return (
      <div>
        <div className="section">
          <h2 className="landingpage-header">User details</h2>
          <UserDetails />
          <h2>Topics</h2>
          <p>
            Set the order of the list of topics according to your preference (1
            = favorite) by dragging and dropping, click to expand details
          </p>
          <div className="dragndrop-container">
            <div className="dragndrop-indexes-container">{indexes}</div>
            <ReactDragList
              className="dragndrop-list"
              handles={false}
              dataSource={this.props.topics}
              onUpdate={this.handleUpdate}
              row={(topic, index) => <TopicDialog topic={topic} key={index} />}
            />
          </div>
        </div>
        <div className="section">
          <h2>Details</h2>
          <p>Please answer all questions</p>
          {questions}
        </div>
        <Button
          onClick={this.updateUser}
          variant="outlined"
          style={{ backgroundColor: 'white' }}
        >
          Submit
        </Button>
      </div>
    )
  }
}

const testQuestions = [
  { question: 'Test scale question?', type: 'scale' },
  { question: 'Test input question?', type: 'text' },
  { question: 'Another test scale question?', type: 'scale' },
  { question: 'Ok?', type: 'text' }
]

const mapStateToProps = (state) => {
  return {
    user: state.loginPage.user,
    isLoading: state.app.isLoading,
    topics: state.registrationPage.topics,
    questions: state.registrationPage.questions,
    email: state.registrationPage.email
  }
}

const mapDispatchToProps = {
  ...registrationPageActions,
  ...notificationActions
}

const ConnectedRegistrationPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationPage)

export default ConnectedRegistrationPage
