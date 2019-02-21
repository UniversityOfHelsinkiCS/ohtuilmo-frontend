import axios from 'axios'
import { BACKEND_URI } from '../utils/config'
import { getUserToken } from '../utils/functions'

const url = `${BACKEND_URI}/api/groups`

const get = async () => {
  const response = await axios.get(url, {
    headers: { Authorization: 'Bearer ' + getUserToken() }
  })

  return response.data
}

const create = async (newGroup) => {
  console.log(newGroup)

  const response = await axios.post(url, newGroup, {
    headers: { Authorization: 'Bearer ' + getUserToken() }
  })

  return response.data
}

const put = async (updatedGroup) => {
  console.log(updatedGroup)

  const response = await axios.put(`${url}/${updatedGroup.id}` , updatedGroup, {
    headers: { Authorization: 'Bearer ' + getUserToken() }
  })

  return response.data
}

const del = async (groupToDelete) => {
 

  const response = await axios.delete(`${url}/${groupToDelete.id}`,  {
    headers: { Authorization: 'Bearer ' + getUserToken() }
  })

  return response.data
}

export default { get, create, put, del }
