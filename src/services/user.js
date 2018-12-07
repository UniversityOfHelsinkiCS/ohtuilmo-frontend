import axios from 'axios'
import { BACKEND_URI } from '../utils/config'
import { getUserToken } from '../utils/functions'

const url = `${BACKEND_URI}/api/users`

const update = async (user) => {
  const config = {
    headers: { 'Authorization': 'bearer ' + getUserToken() }
  }
  const response = await axios.put(url + `/${user.student_number}`, user.email, config)
  return response.data
}

export default { update }
