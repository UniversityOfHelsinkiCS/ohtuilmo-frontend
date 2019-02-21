import registrationQuestionsService from '../../services/registrationQuestionSet'

const fetchRegistrationQuestionSetsRequest = () => ({
  type: 'FETCH_REGISTRATION_QUESTION_SETS_REQUEST'
})

const fetchRegistrationQuestionSetsSuccess = (questionSets) => ({
  type: 'FETCH_REGISTRATION_QUESTION_SETS_SUCCESS',
  payload: questionSets
})

const createRegistrationQuestionSetRequest = () => ({
  type: 'CREATE_REGISTRATION_QUESTION_SET_REQUEST'
})

const createRegistrationQuestionSetSuccess = (createdSet) => ({
  type: 'CREATE_REGISTRATION_QUESTION_SET_SUCCESS',
  payload: createdSet
})

const updateRegistrationQuestionSetRequest = () => ({
  type: 'UPDATE_REGISTRATION_QUESTION_SET_REQUEST'
})

const updateRegistrationQuestionSetSuccess = (updatedSet) => ({
  type: 'UPDATE_REGISTRATION_QUESTION_SET_SUCCESS',
  payload: updatedSet
})

/**
 * @throws if service can't fetch questions, catch this error.
 */
export const fetchRegistrationQuestionSets = () => {
  return async (dispatch) => {
    dispatch(fetchRegistrationQuestionSetsRequest())
    const questionSets = await registrationQuestionsService.getAll()
    dispatch(fetchRegistrationQuestionSetsSuccess(questionSets))
  }
}

export const createRegistrationQuestionSet = (name, questions) => {
  return async (dispatch) => {
    dispatch(createRegistrationQuestionSetRequest())
    const createdSet = await registrationQuestionsService.create({
      name,
      questions
    })
    dispatch(createRegistrationQuestionSetSuccess(createdSet))
  }
}

export const updateRegistrationQuestionSet = (questionSet) => {
  return async (dispatch) => {
    dispatch(updateRegistrationQuestionSetRequest())
    const updatedSet = await registrationQuestionsService.update(questionSet)
    dispatch(updateRegistrationQuestionSetSuccess(updatedSet))
  }
}
