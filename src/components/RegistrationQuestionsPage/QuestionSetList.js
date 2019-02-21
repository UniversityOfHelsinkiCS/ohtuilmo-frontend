import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { questionSetShape } from './common'
import DisplayQuestionSetItem from './DisplayQuestionSetItem'

const QuestionSetItem = ({ questionSet }) => {
  const [isEditMode, setEditMode] = useState(false)

  const goToEditMode = () => {
    setEditMode(true)
  }

  return (
    <li className="question-set-item">
      <Paper depth={1}>
        {isEditMode ? (
          <div>edit</div>
        ) : (
          <DisplayQuestionSetItem questionSet={questionSet} />
        )}
        <Button variant="contained" color="primary" onClick={goToEditMode}>
          Edit
        </Button>
      </Paper>
    </li>
  )
}

QuestionSetItem.propTypes = {
  questionSet: questionSetShape
}

const QuestionSetList = ({ questionSets }) => {
  return (
    <ul className="question-set-list">
      {questionSets.map((set) => (
        <QuestionSetItem key={set.id} questionSet={set} />
      ))}
    </ul>
  )
}

QuestionSetList.propTypes = {
  questionSets: PropTypes.arrayOf(questionSetShape)
}

const mapStateToProps = (state) => ({
  questionSets: state.registrationQuestionsPage.questionSets
})

export default connect(mapStateToProps)(QuestionSetList)
