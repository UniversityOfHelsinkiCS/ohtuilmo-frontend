import axios from 'axios'
import { BACKEND_API_BASE } from '../utils/config'

const url = `${BACKEND_API_BASE}/customerReview`

const get = async () => {
  const response = await axios.get(url, {
    headers: { Authorization: 'Bearer ' + getUserToken() }
  })
  return response.data
}

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
  const response = await axios.get(`${url}/${secretId}`)
  return response.data
}

const getCustomerReviewAnswers = async (configurationId) => {
  const response = await axios.get(
    `${url}/all/forConfiguration/${configurationId}`
  )

  return response.data
}


export default {
  get,
  create,
  getReviewQuestions,
  getDataForReview,
  getCustomerReviewAnswers
}
