let BACKEND_URI = process.env.REACT_APP_BACKEND_URI

if (!BACKEND_URI) BACKEND_URI = 'http://localhost:7001'

export { BACKEND_URI }