import axios from 'axios'
import { BACKEND_URI } from '../utils/config'

const url = `${BACKEND_URI}/api/topics`

const create = async (content) => {
  console.log('submitting proposal')
  console.log('content: ', content)

  const response = await axios.post(url, content)
  return response.data
}

const listAll = async () => {
  const response = await axios.get(url)
  console.log(response)
  return response.data
}

export default { create, listAll }