const setTopic = (topic) => {
  return {
    type: 'SET_TOPIC',
    payload: topic
  }
}

const setEditable = (status) => {
  return {
    type: 'SET_EDITABLE',
    payload: status
  }
}

const setEditMode = (status) => {
  return {
    type: 'SET_EDITMODE',
    payload: status
  }
}

export default { setTopic, setEditable, setEditMode }
