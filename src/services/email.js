import axios from 'axios'
import { BACKEND_URI } from '../utils/config'

const url = `${BACKEND_URI}/api/email`

const sendCustomerEmail = async (address, messageType) => {
  const response = await axios.post(url + '/send', { address, messageType })
  return response.data.message
}

export default { sendCustomerEmail }
