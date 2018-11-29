const initialState = {
  topics: [],
  email: ''
}

const topicListPageReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_TOPICS':
    return {
      ...state,
      topics: action.payload
    }
  case 'UPDATE_EMAIL':
    return {
      ...state,
      email: action.payload
    }
  default:
  }
  return state
}

export default topicListPageReducer