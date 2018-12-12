import axios from 'axios'
import { BACKEND_URI } from '../utils/config'
import { getUserToken } from '../utils/functions'

const url = `${BACKEND_URI}/api/configurations`

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

export default { getAll, getActive }
