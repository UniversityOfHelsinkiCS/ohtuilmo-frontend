const initialState = {
  groupName: '',
  students: '',
  groupTopicID: '',
  groupInstructorID: '',
  groupConfigurationID: '',
  groups: []
}

const groupPageReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_CREATE_GROUP_FORM_NAME':
    return {
      ...state,
      groupName: action.payload
    }
  case 'UPDATE_STUDENTS_FORM':
    return {
      ...state,
      students: action.payload
    }
  case 'UPDATE_TOPIC_ID':
    return {
      ...state,
      groupTopicID: action.payload
    }
  case 'UPDATE_INSTRUCTOR_ID':
    return {
      ...state,
      groupInstructorID: action.payload
    }
  case 'UPDATE_GROUP_CONFIGURATION_ID':
    return {
      ...state,
      groupConfigurationID: action.payload
    }
  case 'CREATE_GROUP_SUCCSESS':
    return {
      ...state,
      groups: [...state.groups, action.payload]
    }
  default:
    return state
  }
}

export default groupPageReducer
