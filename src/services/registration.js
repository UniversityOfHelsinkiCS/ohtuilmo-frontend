import axios from 'axios'
import { BACKEND_URI } from '../utils/config'

const url = `${BACKEND_URI}/api/registrations`

const create = async (student_number, content, token) => {
  const response = await axios.post(
    url,
    { student_number, content },
    { headers: { 'Authorization': 'Bearer ' + token } }
  )
  return response.data.registration
}

export default { create }