import axios from 'axios'
import { BACKEND_API_BASE } from '../utils/config'

const url = `${BACKEND_API_BASE}/email`

const sendCustomerEmail = async (address, messageType) => {
  const response = await axios.post(url + '/send', { address, messageType })
  return response.data.message
}

export default { sendCustomerEmail }
