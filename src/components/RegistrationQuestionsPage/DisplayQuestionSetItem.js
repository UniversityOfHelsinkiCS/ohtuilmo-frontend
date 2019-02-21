import React from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'
import { withTheme } from '@material-ui/core/styles'
import { questionShape, questionSetShape } from './common'

const DisplayQuestionsTableRow = ({ question, type }) => (
  <TableRow className="display-questions-table-row">
    <TableCell component="th" scope="row">
      {question}
    </TableCell>
    <TableCell align="right">{type}</TableCell>
  </TableRow>
)

DisplayQuestionsTableRow.propTypes = {
  question: PropTypes.string.isRequired,
  type: PropTypes.string
}

const DisplayQuestionsTable = ({ questions }) => (
  <Table className="display-questions-table">
    <TableHead>
      <TableRow>
        <TableCell>Question</TableCell>
        <TableCell align="right">Type</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {questions.map(({ question, type }) => (
        <DisplayQuestionsTableRow
          key={question}
          question={question}
          type={type}
        />
      ))}
    </TableBody>
  </Table>
)

DisplayQuestionsTable.propTypes = {
  questions: PropTypes.arrayOf(questionShape)
}

const DisplayQuestionSetItem = ({ questionSet, theme }) => {
  const { name, questions } = questionSet
  console.log('theme', theme)
  const headerStyle = {
    borderBottomColor: theme.palette.primary.main
  }

  return (
    <div className="display-question-set-item">
      <h3 className="display-question-set-item__header" style={headerStyle}>
        <span className="display-question-set-item__name">{name}</span>
      </h3>
      <DisplayQuestionsTable questions={questions} />
    </div>
  )
}

DisplayQuestionSetItem.propTypes = {
  questionSet: questionSetShape,
  theme: PropTypes.object // withTheme
}

export default withTheme()(DisplayQuestionSetItem)
