import axios from 'axios'
import { BACKEND_API_BASE } from '../utils/config'
import { getUserToken } from '../utils/functions'

const url = `${BACKEND_API_BASE}/email`

const sendCustomerEmail = async (address, messageType, messageLanguage) => {
  const response = await axios.post(url + '/send', {
    address,
    messageType,
    messageLanguage
  })
  return response.data.message
}

const getTemplates = async () => {
  const res = await axios.get(`${url}/templates`, {
    headers: { Authorization: 'Bearer ' + getUserToken() }
  })
  return res.data
}

const updateTemplates = async (templates) => {
  const res = await axios.post(`${url}/templates`, templates, {
    headers: { Authorization: 'Bearer ' + getUserToken() }
  })
  return res.data
}

export default { sendCustomerEmail, getTemplates, updateTemplates }
