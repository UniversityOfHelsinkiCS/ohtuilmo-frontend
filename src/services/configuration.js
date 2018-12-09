import axios from 'axios'
import { BACKEND_URI } from '../utils/config'

const url = `${BACKEND_URI}/api/configurations`

const getActive = async () => {
  const response = await axios.get(url + '/active')
  return response.data.configuration
}

export default { getActive }
