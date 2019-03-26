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

const setQuestions = (questions) => {
  return {
    type: 'SET_QUESTIONS',
    payload: questions
  }
}

export default {
  updateAnswer,
  initializeAnswerSheet,
  setLoading,
  setQuestions
}
