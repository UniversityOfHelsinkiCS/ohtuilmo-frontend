import axios from 'axios'
import { BACKEND_URI } from '../utils/config'

const url = `${BACKEND_URI}/api/login`

const login = async (credentials) => {
  console.log('logging in with: ', credentials)
  console.log('logging to', url)

  // post credentials to backend, return response
  const response = await axios.post(url, credentials)
  return response.data
}

export default { login }
