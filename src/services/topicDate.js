import axios from 'axios'
import { BACKEND_URI } from '../utils/config'

const url = `${BACKEND_URI}/api/topicDates`

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

export default { getAll }
