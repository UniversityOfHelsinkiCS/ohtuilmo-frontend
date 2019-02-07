/* import axios from 'axios' */
/* import { BACKEND_URI } from '../utils/config' */
/* import { getUserToken } from '../utils/functions' */

/* const url = `${BACKEND_URI}/api/groups` */

const get = async () => {
/*   const response = await axios.get(url) */

  return [
    {
      id: 1,
      name: 'Ohtuprojekti-ilmo',
      createdAt: '2019-02-05T11:51:03.808Z',
      updatedAt: '2019-02-05T11:51:03.808Z',
      topicId: 34,
      instructorId: '011714796',
      configurationId: 1,
      studentIds: [
        '014710946',
        '014709290',
        '014741944',
        '013309617',
        '014798162',
        '012345678'
      ]
    },
    {
      id: 37,
      name: 'Fluxx-chat',
      createdAt: '2019-02-07T11:50:40.070Z',
      updatedAt: '2019-02-07T11:50:40.070Z',
      topicId: 46,
      instructorId: '014591770',
      configurationId: 1,
      studentIds: ['014689116', '014806067', '014712876']
    }
  ]
}

const create = async (newGroup) => {
  console.log(newGroup)
  /*
  const response = await axios.post(url, groupManagement, {
    headers: {Authorization: 'Bearer ' +getUserToken() }
  })
  return response.data
   */

  return {
    id: 37,

    name: 'Fluxx-chat',

    createdAt: '2019-02-07T11:50:40.070Z',

    updatedAt: '2019-02-07T11:50:40.070Z',

    topicId: 46,

    instructorId: '014591770',

    configurationId: 1,

    studentIds: ['014712876', '014806067', '014689116']
  }
}

export default { get, create }
