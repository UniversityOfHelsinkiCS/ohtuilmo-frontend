const initialState = {
  answerSheet: [],
  isInitializing: true,
  hasReviewed: false,
  questions: '',
  groupName: '',
  groupId: '',
  configuration: '',
  noGroup: false
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
  case 'SET_REVIEW':
    return {
      ...state,
      hasReviewed: action.payload
    }
  case 'SET_QUESTIONS':
    return {
      ...state,
      questions: action.payload
    }
  case 'SET_GROUP_NAME':
    return{
      ...state,
      groupName: action.payload
    }
  case 'SET_GROUP_ID':
    return{
      ...state,
      groupId: action.payload
    }
  case 'SET_CONFIGURATION':
    return{
      ...state,
      configuration: action.payload
    }
  case 'SET_NOGROUP':
    return{
      ...state,
      noGroup: action.payload,
      isInitializing: false
    }
  default:
    return state
  }
}

export default customerReviewPageReducer
