const initialState = {
  topic: ''
}

const viewTopicPageReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_TOPIC':
    return {
      ...state,
      topic: action.payload
    }
  default:
  }
  return state
}

export default viewTopicPageReducer