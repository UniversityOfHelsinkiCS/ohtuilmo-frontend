const initializeAnswerSheet = (answerSheet) => {
  return {
    type: 'INITIALIZE_ANSWER_SHEET',
    payload: answerSheet
  }
}

const updateAnswer = (answer, questionId) => {
  return {
    type: 'UPDATE_ANSWER',
    answer: answer,
    questionId: questionId
  }
}

const setLoading = (loading) => {
  return {
    type: 'LOADING',
    payload: loading
  }
}

const setReview = (review) => {
  return {
    type: 'SET_REVIEW',
    payload: review
  }
}

const setQuestions = (questions) => {
  return {
    type: 'SET_QUESTIONS',
    payload: questions
  }
}

const setGroupName = (group) => {
  return {
    type: 'SET_GROUP_NAME',
    payload: group
  }
}

const setGroupId = (groupId) => {
  return {
    type: 'SET_GROUP_ID',
    payload: groupId
  }
}

const setConfiguration = (configurationId) => {
  return {
    type: 'SET_CONFIGURATION',
    payload: configurationId
  }
}

export default {
  updateAnswer,
  initializeAnswerSheet,
  setLoading,
  setReview,
  setQuestions,
  setGroupName,
  setGroupId,
  setConfiguration
}
