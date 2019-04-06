import axios from 'axios'
import { BACKEND_API_BASE } from '../utils/config'
import { getUserToken } from '../utils/functions'

const url = `${BACKEND_API_BASE}/email`

const getAuthHeaders = () => ({
  Authorization: 'Bearer ' + getUserToken()
})

const sendCustomerEmail = async (
  address,
  messageType,
  messageLanguage,
  templateContext
) => {
  const response = await axios.post(
    url + '/send',
    {
      address,
      messageType,
      messageLanguage,
      templateContext
    },
    {
      headers: getAuthHeaders()
    }
  )
  return response.data
}

const getTemplates = async () => {
  const res = await axios.get(`${url}/templates`, {
    headers: getAuthHeaders()
  })
  return res.data
}

const updateTemplates = async (templates) => {
  const res = await axios.post(`${url}/templates`, templates, {
    headers: getAuthHeaders()
  })
  return res.data
}

export default { sendCustomerEmail, getTemplates, updateTemplates }
