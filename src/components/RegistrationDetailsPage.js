import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ReactDragList from 'react-drag-list'

import registrationActions from '../reducers/actions/registrationActions'

import Typography from '@material-ui/core/Typography'
import { Input, Card, CardContent, Select, MenuItem } from '@material-ui/core'
import TopicDialog from './TopicDialog'

import './RegistrationDetailsPage.css'

class RegistrationDetailsPage extends React.Component {
  render() {
    const registration = this.props.ownRegistration
    const { student, preferred_topics, questions, createdAt } = registration
    const { first_names, last_name, student_number, email } = student

    let firstname = ''
    if (first_names.includes('*')) {
      firstname = first_names.split('*')[1]
    }
    firstname = firstname.split(' ')[0]

    const submittedDate = createdAt.replace(/T/, ' ').substr(0, 16)

    return (
      <div>
        <Typography variant="h4" gutterBottom>
          Registration details
        </Typography>
        <Typography variant="body1" gutterBottom>
          Registration date: {submittedDate}
        </Typography>
        <div>
          <h2>User details</h2>
          <Typography variant="body1" gutterBottom>
            Name: {firstname} {last_name}
            <br />
            Student number: {student_number}
            <br />
            Email: {email}
          </Typography>
        </div>
        <div>
          <h2>Preferred Topics</h2>
          <div className="dragndrop-container">
            <div className="dragndrop-indexes-container">
              {preferred_topics.map((topic, index) => {
                return (
                  <Card key={index} className="dragndrop-index">
                    {index + 1}
                  </Card>
                )
              })}
            </div>
            <ReactDragList
              className="dragndrop-list"
              handles={false}
              dataSource={preferred_topics}
              rowKey="id"
              row={(topic) => {
                return <TopicDialog topic={topic} key={topic.content.title} />
              }}
              disabled
            />
          </div>
        </div>
        <div>
          <h2>Details</h2>
          {questions.map((question, index) => {
            return (
              <Card style={{ marginBottom: '10px' }} key={index}>
                <CardContent>
                  <Typography variant="body1">{question.question}</Typography>
                  {question.type === 'scale' ? (
                    <Select value={question.answer} disabled>
                      <MenuItem value={0}>0</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                    </Select>
                  ) : (
                    <Input
                      value={question.answer}
                      fullWidth
                      multiline
                      rowsMax="3"
                      disabled
                    />
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ownRegistration: state.registration
  }
}

const mapDispatchToProps = {
  fetchRegistration: registrationActions.fetchRegistration
}

const ConnectedRegistrationDetailsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationDetailsPage)

export default withRouter(ConnectedRegistrationDetailsPage)
