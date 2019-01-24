import axios from 'axios'
import { BACKEND_URI } from '../utils/config'
import { getUserToken } from '../utils/functions'

const url = `${BACKEND_URI}/api/registrationManagement`

const get = async () => {
  const response = await axios.get(url)
  return response.data
}

const create = async (registrationManagement) => {
  const response = await axios.post(url, registrationManagement, {
    headers: { Authorization: 'Bearer ' + getUserToken() }
  })
  return response.data
}

export default { get, create }
