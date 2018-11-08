const initialState = {
  topics: []
}

const topicListPageReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'FETCH_TOPICS':
    return {
      ...state,
      topics: action.payload
    }
  default:
  }
  return state
}

export default topicListPageReducer