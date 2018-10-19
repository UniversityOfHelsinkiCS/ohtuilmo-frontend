import axios from 'axios'
import { BACKEND_URI } from '../utils/config'

const url = `${BACKEND_URI}/api/topics`

const create = async (content) => {
  const response = await axios.post(url, content)
  return response.data
}

export default { create }
