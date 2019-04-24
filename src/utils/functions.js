export const getUserToken = () => {
  const loggedInUser = localStorage.getItem('loggedInUser')
  let token
  if (loggedInUser) {
    token = JSON.parse(loggedInUser).token
  }
  return token
}

export const getUser = () => {
  const loggedInUser = localStorage.getItem('loggedInUser')
  let user
  if (loggedInUser) {
    user = JSON.parse(loggedInUser).user
  }
  return user
}

const replaceTopicName = (template, replacement) =>
  template.replace(/{{topicName}}/g, replacement)

const emailTemplateRenderers = {
  /**
   * @param {object} topic
   * @param {string} template
   * @returns {string}
   */
  topicAccepted: (topic, template) => {
    const topicName = topic.content.title
    return replaceTopicName(template, topicName)
  },
  /**
   * @param {object} topic
   * @param {string} template
   * @returns {string}
   */
  topicRejected: (topic, template) => {
    const topicName = topic.content.title
    return replaceTopicName(template, topicName)
  }
}

/**
 * @param {'topicAccepted' | 'topicRejected'} templateName
 */
export const getEmailTemplateRenderer = (templateName) => {
  return emailTemplateRenderers[templateName]
}

/**
 * Format datetime
 * eg. from 2019-02-07T10:57:19.122Z to 7.2.2019 12.57
 */
export const formatDate = (date) => {
  const parsedDate = new Date(date).toLocaleString('fi-FI')
  return parsedDate.slice(0, parsedDate.lastIndexOf('.')).replace('klo', '')
}
