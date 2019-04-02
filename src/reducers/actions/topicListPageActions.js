import topicService from '../../services/topic'

const updateFilter = (filter) => {
  return {
    type: 'TOPIC_PAGE_UPDATE_FILTER',
    payload: filter
  }
}

const fetchTopicsRequest = () => ({
  type: 'TOPIC_PAGE_FETCH_TOPICS_REQUEST'
})

const fetchTopicsFailed = () => ({
  type: 'TOPIC_PAGE_FETCH_TOPICS_FAILED'
})

const fetchTopicsSuccess = (topics) => ({
  type: 'TOPIC_PAGE_FETCH_TOPICS_SUCCESS',
  payload: topics
})

const updateTopicRequest = () => ({
  type: 'TOPIC_PAGE_UPDATE_TOPIC_REQUEST'
})

const updateTopicFailed = () => ({
  type: 'TOPIC_PAGE_UPDATE_TOPIC_FAILED'
})

const updateTopicSuccess = (updatedTopic) => ({
  type: 'TOPIC_PAGE_UPDATE_TOPIC_SUCCESS',
  payload: updatedTopic
})

const fetchTopics = () => {
  return async (dispatch) => {
    dispatch(fetchTopicsRequest())
    try {
      const topics = await topicService.getAll()
      //sorts topics based on timestamp
      const sortedTopics = topics.sort((t1, t2) =>
        t1.createdAt > t2.createdAt ? -1 : t1.createdAt < t2.createdAt ? 1 : 0
      )
      dispatch(fetchTopicsSuccess(sortedTopics))
    } catch (e) {
      dispatch(fetchTopicsFailed())
      throw e // re-throw so UI can catch for error msg
    }
  }
}

/**
 * @param {string} topicId
 * @param {boolean} newActiveState
 */
const setTopicActive = (topic, newActiveState) => {
  return async (dispatch) => {
    dispatch(updateTopicRequest())
    try {
      const stagedTopic = {
        ...topic,
        active: newActiveState
      }
      const updatedTopic = await topicService.update(stagedTopic)
      dispatch(updateTopicSuccess(updatedTopic))
    } catch (e) {
      dispatch(updateTopicFailed())
      throw e
    }
  }
}

export default {
  fetchTopics,
  setTopicActive,
  updateFilter
}
