const initialState = {
  answerSheet: [],
  isInitializing: true,
  groupMembers: [],
  groupsLoading: true,
  submittedReview: false,
  group: []
}

const updateQuestionAnswer = (question, answer) => ({ ...question, answer })

const updateRevieweeQuestionAnswer = (user, targetQuestionIndex, answer) => ({
  ...user,
  answers: user.answers.map((question, questionIndex) =>
    questionIndex === targetQuestionIndex
      ? updateQuestionAnswer(question, answer)
      : question
  )
})

const updateAnswerSheet = (
  answerSheet,
  targetUserIndex,
  targetQuestionIndex,
  answer
) => {
  return answerSheet.map((user, userIndex) =>
    userIndex === targetUserIndex
      ? updateRevieweeQuestionAnswer(user, targetQuestionIndex, answer)
      : user
  )
}

const instructorReviewReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INSTRUCTOR_INITIALIZE_ANSWER_SHEET':
    return {
      ...state,
      answerSheet: action.payload,
      isInitializing: false
    }
  case 'INSTRUCTOR_UPDATE_ANSWER': {
    return {
      ...state,
      answerSheet: updateAnswerSheet(
        state.answerSheet,
        action.user,
        action.question,
        action.answer
      )
    }
  }
  case 'SET_INSTRUCTOR_REVIEW_GROUP': {
    return {
      ...state,
      group: action.payload
    }
  }

  case 'INSTRUCTOR_CREATE_STUDENTS':
    return {
      ...state,
      groupMembers: action.payload,
      groupsLoading: false
    }
  case 'INSTRUCTOR_SET_SUBMITTED_REVIEW':
    return {
      ...state,
      submittedReview: action.payload
    }
  case 'INSTRUCTOR_LOADING':
    return {
      ...state,
      isInitializing: action.payload
    }
  case 'INSTRUCTOR_SET_QUESTIONS':
    return {
      ...state,
      questions: action.payload
    }
  case 'INSTRUCTOR_SET_CONFIGURATION':
    return {
      ...state,
      configurationId: action.payload
    }
  default:
    return state
  }
}

export default instructorReviewReducer
