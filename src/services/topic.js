import axios from 'axios'
import { BACKEND_URI } from '../utils/config'

const url = `${BACKEND_URI}/api/topics`

const create = async (content) => {
  console.log('submitting proposal')
  console.log('content: ', content)

  const response = await axios.post(url, content)
  return response.data
}

const getAll = async () => {
  const loggedInUser = localStorage.getItem('loggedInUser')
  let token
  if (loggedInUser) {
    token = JSON.parse(loggedInUser).token
  }
  const config = {
    headers: { 'Authorization': 'bearer ' + token }
  }
  const response = await axios.get(url, config)
  console.log(response)
  return response.data
}


//available topics for students can be fetched with getActive
const getActive = async () => {
  const response = await axios.get(url + '/active')
  return response.data
}

const update = async (topic) => {
  console.log('updating topic')
  console.log('content: ', topic)
  const loggedInUser = localStorage.getItem('loggedInUser')
  let token
  if (loggedInUser) {
    token = JSON.parse(loggedInUser).token
  }
  const config = {
    headers: { 'Authorization': 'bearer ' + token }
  }
  const response = await axios.put(url + '/' + topic.topic_id, topic, config)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(url + '/' + id)
  return response.data
}

export default { create, getAll, getOne , update, getActive }
