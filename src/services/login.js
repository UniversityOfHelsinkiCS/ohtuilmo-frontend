import axios from 'axios'

const url = `${process.env.REACT_APP_BACKEND_URI}/api/login`

const login = async (credentials) => {
    console.log("logging in with: ", credentials)
    console.log('logging to', url)
    
    // post credentials to backend, return response
    const response = await axios.post(url, credentials)
    return response.data
}

export default { login }