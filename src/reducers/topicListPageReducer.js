const initialState = {
  topics: [],
  filter: 'all'
}

const topicListPageReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_TOPICS':
    return {
      ...state,
      topics: action.payload
    }
  case 'UPDATE_FILTER':
    return {
      ...state,
      filter: action.payload
    }
  default:
  }
  return state
}

export default topicListPageReducer