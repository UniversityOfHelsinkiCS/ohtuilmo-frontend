import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import { questionSetShape } from './common'
import QuestionSetForm from './QuestionSetForm'
import QuestionSetItem from './QuestionSetItem'
import './EditableQuestionSetItem.css'

const SaveButton = ({ className }) => (
  <Button
    className={className}
    type="submit"
    variant="contained"
    color="primary"
  >
    Save changes
  </Button>
)

SaveButton.propTypes = {
  className: PropTypes.string
}

const CancelButton = ({ className, onClick }) => (
  <Button className={className} onClick={onClick}>
    Cancel
  </Button>
)

CancelButton.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
}

const EditorQuestionSetItem = ({ questionSet, onSave, onCancel }) => {
  const formControls = (
    <>
      <SaveButton className="editor-question-set-item__save-button" />
      <CancelButton
        className="editor-question-set-item__cancel-button"
        onClick={onCancel}
      />
    </>
  )

  const { name, questions } = questionSet

  return (
    <div className="editor-question-set-item">
      <Paper elevation={1} className="editor-question-set-item__container">
        <QuestionSetForm
          initialName={name}
          initialQuestionsJson={JSON.stringify(questions, null, 2)}
          onSubmit={(name, questions) => onSave(name, questions)}
          controls={formControls}
        />
      </Paper>
    </div>
  )
}

EditorQuestionSetItem.propTypes = {
  questionSet: questionSetShape,
  onSave: PropTypes.func,
  onCancel: PropTypes.func
}

const EditableQuestionSetItem = ({ questionSet, onEditSave }) => {
  const [isEditing, setIsEditing] = useState(false)

  const handleEditorSave = (name, questions) => {
    const updatedItem = {
      ...questionSet,
      name,
      questions
    }
    onEditSave(updatedItem)
    setIsEditing(false)
  }

  const renderNormalItem = () => (
    <QuestionSetItem
      questionSet={questionSet}
      onEditClicked={() => setIsEditing(true)}
    />
  )

  const renderEditingItem = () => (
    <EditorQuestionSetItem
      questionSet={questionSet}
      onSave={handleEditorSave}
      onCancel={() => setIsEditing(false)}
    />
  )

  return isEditing ? renderEditingItem() : renderNormalItem()
}

EditableQuestionSetItem.propTypes = {
  questionSet: questionSetShape,
  onEditSave: PropTypes.func
}

export default EditableQuestionSetItem
