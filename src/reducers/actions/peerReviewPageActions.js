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
const createPeers = (peers) => {
  return {
    type: 'CREATE_PEERS',
    payload: peers
  }
}
const setAnswerFoundTrue = (found) => {
  return {
    type: 'ANSWER_FOUND',
    payload: found
  }
}
const setLoading = (loading) => {
  return {
    type: 'LOADING',
    payload: loading
  }
}

const setQuestions = (questions) => {
  return {
    type: 'SET_QUESTIONS',
    payload: questions
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
  createPeers,
  setAnswerFoundTrue,
  setLoading,
  setQuestions,
  setConfiguration
}
