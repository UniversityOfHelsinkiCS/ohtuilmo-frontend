const initialState = {
  answerSheet: [],
  isInitializing: true,
  questions: ''
}

const customerReviewPageReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INITIALIZE_ANSWER_SHEET':
    return {
      ...state,
      answerSheet: action.payload,
      isInitializing: false
    }
  case 'UPDATE_ANSWER':
    return {
      ...state,
      answerSheet: [
        ...state.answerSheet.slice(0, action.questionId),
        {
          ...state.answerSheet[action.questionId],
          answer: action.answer
        },
        ...state.answerSheet.slice(action.questionId + 1)
      ]
    }
  case 'LOADING':
    return {
      ...state,
      isInitializing: action.payload
    }
  case 'SET_QUESTIONS':
    return {
      ...state,
      questions: action.payload
    }
  default:
    return state
  }
}

export default customerReviewPageReducer
