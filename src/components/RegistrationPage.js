import React from 'react'
import topicService from '../services/topic'
import { connect } from 'react-redux'
import './RegistrationPage.css'
import ReactDragList from 'react-drag-list'
import Topic from './Topic'
// MUI
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
// Actions
import registrationPageActions from '../reducers/actions/registrationPageActions'
import notificationActions from '../reducers/actions/notificationActions'

class RegistrationPage extends React.Component {
  componentDidMount() {
    this.fetchTopics()
  }

  async fetchTopics() {
    try {
      const fetchedTopics = await topicService.getAllActive().then(function (defs) {
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
    console.log(evt)
    console.log(updated)
    this.props.updateTopics(updated)
  }

  render() {
    let questions = testQuestions.map((item, idx) => (
      <Card style={{ marginBottom: '10px' }} key={idx} >
        <CardContent>
          <p>{item.question}</p>
          {item.type === 'scale'? <div>Scale 1 to 5 selector</div> : null}
          {item.type === 'text'? <Input /> : null}
        </CardContent>
      </Card>
    ))

    let indexes = this.props.topics.map((item, idx) => (
      <p key={idx} className='dragndrop-index'>{idx + 1}</p>
    ))

    return (
      <div>
        <div className="section">
          <h2 className="landingpage-header">User details</h2>
          <p>---</p>
          <h2>Topics</h2>
          <p>Order the list of topics according to your preference by dragging and dropping, click to expand</p>
          <div className='dragndrop-container'>
            <div className='dragndrop-indexes-container'>{indexes}</div>
            <ReactDragList
              className='dragndrop-list'
              handles={false}
              dataSource={this.props.topics}
              onUpdate={this.handleUpdate}
              row={(topic, index) => (
                <ExpansionPanel key={index}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography style={{ flex: 6, fontWeight: 'bold', color: 'gray', fontStyle: 'italic' }}>Customer: {topic.content.customerName}</Typography>
                    <Typography style={{ flex:  6, fontWeight: 'bold', color: 'gray', fontStyle: 'italic' }}>{topic.content.title}</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Topic content={topic.content}/>
                  </ExpansionPanelDetails>
                </ExpansionPanel>)}
            />
          </div>
        </div>
        <div className="section">
          <h2>Details</h2>
          <p>Please answer all questions</p>
          {questions}
        </div>
        <Button variant="outlined" style={{ backgroundColor: 'white' }} >Submit</Button>
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
    topics: state.registrationPage.topics
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