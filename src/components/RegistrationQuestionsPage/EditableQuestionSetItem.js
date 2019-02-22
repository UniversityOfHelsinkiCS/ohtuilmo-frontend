import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import { withTheme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import { questionSetShape } from './common'
import QuestionSetForm from './QuestionSetForm'
import QuestionsTable from './QuestionsTable'
import './EditableQuestionSetItem.css'

const ItemControls = ({ onEditClicked }) => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const withClose = (fn) => () => {
    handleClose()
    fn()
  }

  return (
    <>
      <IconButton
        className="question-set-item-controls__menu-button"
        aria-owns={anchorEl && 'question-set-item-controls__menu'}
        aria-haspopup={true}
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="question-set-item-controls__menu"
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem
          className="question-set-item-controls__edit-button"
          onClick={withClose(onEditClicked)}
        >
          Edit
        </MenuItem>
      </Menu>
    </>
  )
}

ItemControls.propTypes = {
  onEditClicked: PropTypes.func
}

const QuestionSetItem = withTheme()(({ questionSet, onEditClicked, theme }) => {
  const headerStyle = {
    borderColor: theme.palette.primary.main
  }

  const { name, questions } = questionSet

  return (
    <div className="question-set-item">
      <Paper
        elevation={2}
        className="question-set-item__header"
        style={headerStyle}
      >
        <h3 className="question-set-item__title">{name}</h3>
        <div className="question-set-item__controls">
          <ItemControls onEditClicked={onEditClicked} />
        </div>
      </Paper>
      <div className="question-set-item__content">
        <Paper elevation={1}>
          <QuestionsTable questions={questions} />
        </Paper>
      </div>
    </div>
  )
})

QuestionSetItem.propTypes = {
  questionSet: questionSetShape,
  onEditClicked: PropTypes.func,
  theme: PropTypes.object
}

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
