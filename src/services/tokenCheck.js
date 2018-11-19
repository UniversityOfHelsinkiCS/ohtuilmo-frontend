import axios from 'axios'
import { BACKEND_URI } from '../utils/config'

const url = `${BACKEND_URI}/api/tokenCheck`

const userCheck = async (token) => {
  const response = await axios.get(url + '/login', { headers: { 'Authorization': 'Bearer ' + token } })
  return response.data
}

export default { userCheck }
