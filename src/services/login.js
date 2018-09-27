import axios from 'axios'

const baseUrl = "http://localhost:3001/api/login"

const login = async (credentials) => {
    await console.log("logging in with: ", credentials)

    // post credentials to backend, return response
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { login }