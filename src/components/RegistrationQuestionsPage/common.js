import PropTypes from 'prop-types'

export const questionShape = PropTypes.shape({
  question: PropTypes.string.isRequired,
  type: PropTypes.string
})

export const questionSetShape = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  questions: PropTypes.arrayOf(questionShape),
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string
})
