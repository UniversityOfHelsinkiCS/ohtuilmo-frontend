import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import './QuestionSetForm.css'

const isValidJson = (str) => {
  try {
    JSON.parse(str)
    return true
  } catch (err) {
    return false
  }
}

const QuestionSetForm = ({
  initialName,
  initialQuestionsJson,
  onSubmit,
  controls
}) => {
  const [name, setName] = useState(initialName || '')
  const [questionsJson, setQuestionsJson] = useState(initialQuestionsJson || '')
  const [questionsError, setQuestionsError] = useState('')

  const clearQuestionsError = () => {
    if (questionsError !== '') {
      setQuestionsError('')
    }
  }

  const handleNameChange = (e) => setName(e.target.value)

  const handleQuestionsChange = (e) => {
    setQuestionsJson(e.target.value)
    clearQuestionsError()
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    if (!isValidJson(questionsJson)) {
      setQuestionsError('Field contains invalid JSON')
      return
    }

    const parsedQuestions = JSON.parse(questionsJson)
    onSubmit(name, parsedQuestions)
    setName('')
    setQuestionsJson('')
  }

  return (
    <form className="question-set-form" onSubmit={handleFormSubmit}>
      <TextField
        inputProps={{
          className: 'create-question-set-form__input-form'
        }}
        fullWidth
        required
        label="Name"
        margin="normal"
        value={name}
        onChange={handleNameChange}
      />
      <TextField
        error={!!questionsError}
        inputProps={{
          style: {
            fontFamily:
              'source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace',
            fontSize: '0.9em'
          },
          className: 'create-question-set-form__input-json'
        }}
        fullWidth
        required
        label="Questions (JSON)"
        helperText={questionsError || ''}
        margin="normal"
        multiline
        rows={10}
        value={questionsJson}
        onChange={handleQuestionsChange}
      />
      {controls}
    </form>
  )
}

export default QuestionSetForm
