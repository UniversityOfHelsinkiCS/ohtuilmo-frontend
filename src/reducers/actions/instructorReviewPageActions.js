const initializeAnswerSheet = (answerSheet) => {
  return {
    type: 'INSTRUCTOR_INITIALIZE_ANSWER_SHEET',
    payload: answerSheet
  }
}

const updateAnswer = (answer, userId, questionId) => {
  return {
    type: 'INSTRUCTOR_UPDATE_ANSWER',
    answer: answer,
    user: userId,
    question: questionId
  }
}
//Ei käytössä
const createStudents = (students) => {
  return {
    type: 'INSTRUCTOR_CREATE_STUDENTS',
    payload: students
  }
}
const setGroup = (group) => {
  return {
    type: 'SET_INSTRUCTOR_REVIEW_GROUP',
    payload: group
  }
}
const setSubmittedReview = (submittedReview) => {
  return {
    type: 'INSTRUCTOR_SET_SUBMITTED_REVIEW',
    payload: submittedReview
  }
}
//Ei käytössä
const setLoading = (loading) => {
  return {
    type: 'INSTRUCTOR_LOADING',
    payload: loading
  }
}
//Ei käytössä
const setQuestions = (questions) => {
  return {
    type: 'INSTRUCTOR_SET_QUESTIONS',
    payload: questions
  }
}
//Ei käytössä
const setConfiguration = (configurationId) => {
  return {
    type: 'INSTRUCTOR_SET_CONFIGURATION',
    payload: configurationId
  }
}

export default {
  updateAnswer,
  initializeAnswerSheet,
  createStudents,
  setSubmittedReview,
  setLoading,
  setQuestions,
  setConfiguration,
  setGroup
}
