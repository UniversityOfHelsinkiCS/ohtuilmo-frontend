import PropTypes from 'prop-types'

export const templateShape = PropTypes.shape({
  finnish: PropTypes.string,
  english: PropTypes.string
})

export const templatesShape = PropTypes.shape({
  topicAccepted: templateShape,
  topicRejected: templateShape
})

export const replacementsShape = PropTypes.arrayOf(
  PropTypes.shape({
    token: PropTypes.string,
    replacer: PropTypes.func
  })
)
