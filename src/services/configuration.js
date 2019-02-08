import axios from 'axios'
import { BACKEND_API_BASE } from '../utils/config'
import { getUserToken } from '../utils/functions'

const url = `${BACKEND_API_BASE}/configurations`

const getAll = async () => {
  const response = await axios.get(url, {
    headers: { Authorization: 'Bearer ' + getUserToken() }
  })
  return response.data
}

const getActive = async () => {
  const response = await axios.get(url + '/active')
  return response.data.configuration
}

const create = async (configuration) => {
  const response = await axios.post(url, configuration, {
    headers: { Authorization: 'Bearer ' + getUserToken() }
  })
  return response.data
}

const update = async (configuration, id) => {
  const response = await axios.put(url + '/' + id, configuration, {
    headers: { Authorization: 'Bearer ' + getUserToken() }
  })
  return response.data
}

export default { getAll, getActive, create, update }
