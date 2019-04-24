import axios from 'axios'
import { BACKEND_API_BASE } from '../utils/config'

const url = `${BACKEND_API_BASE}/customerReview`

const create = async (customerReview) => {
  const response = await axios.post(url, customerReview)

  return response.data
}

const getReviewQuestions = async (configurationId) => {
  const response = await axios.get(
    `${BACKEND_API_BASE}/configurations/${configurationId}/customerreviewquestions`
  )

  return response.data
}

const getDataForReview = async (secretId) => {
  const response = await axios.get(
    `${BACKEND_API_BASE}/customerReview/${secretId}`
  )

  return response.data
}

export default { create, getReviewQuestions, getDataForReview }
