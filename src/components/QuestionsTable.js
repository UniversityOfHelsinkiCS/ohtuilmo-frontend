import React from 'react'
import PropTypes from 'prop-types'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableBody from '@material-ui/core/TableBody'

const QuestionsTableRow = ({ question, type }) => (
  <TableRow className="questions-table-row">
    <TableCell component="th" scope="row">
      {question}
    </TableCell>
    <TableCell align="right" style={{ width: '100px' }}>
      {type}
    </TableCell>
  </TableRow>
)

QuestionsTableRow.propTypes = {
  question: PropTypes.string.isRequired,
  type: PropTypes.string
}

const QuestionsTable = ({ questions }) => (
  <Table className="questions-table">
    <TableHead>
      <TableRow>
        <TableCell>Question</TableCell>
        <TableCell align="right" style={{ width: '100px' }}>
          Type
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {questions.map(({ question, type }) => (
        <QuestionsTableRow key={question} question={question} type={type} />
      ))}
    </TableBody>
  </Table>
)

QuestionsTable.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      type: PropTypes.string
    })
  )
}

export default QuestionsTable
