import axios from 'axios'
import { BACKEND_URI } from '../utils/config'

const url = `${BACKEND_URI}/api/topics`

const create = async (content) => {
  const response = await axios.post(url, content)
  return response.data.topic
}

const getAll = async () => {
  let token
  const loggedInUser = localStorage.getItem('loggedInUser')
  if (loggedInUser) {
    token = JSON.parse(loggedInUser).token
  }
  const config = {
    headers: { 'Authorization': 'bearer ' + token }
  }
  const response = await axios.get(url, config)
  return response.data.topics
}

const update = async (topic) => {
  const loggedInUser = localStorage.getItem('loggedInUser')
  let token
  if (loggedInUser) {
    token = JSON.parse(loggedInUser).token
  }
  const config = {
    headers: { 'Authorization': 'bearer ' + token }
  }
  const response = await axios.put(url + '/' + topic.id, topic, config)
  return response.data.topic
}

const getOne = async (id) => {
  const response = await axios.get(url + '/' + id)
  return response.data.topic
}

export default { create, getAll, getOne , update }
