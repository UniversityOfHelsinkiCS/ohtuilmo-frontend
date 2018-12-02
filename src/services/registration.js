import axios from 'axios'
import { BACKEND_URI } from '../utils/config'

const url = `${BACKEND_URI}/api/registrations`

const create = async (questions, preferredTopics, token) => {
  const response = await axios.post(
    url,
    { questions, preferredTopics },
    { headers: { 'Authorization': 'Bearer ' + token } }
  )
  return response.data.registration
}

export default { create }