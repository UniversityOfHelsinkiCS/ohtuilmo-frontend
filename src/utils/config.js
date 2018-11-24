let BACKEND_URI = process.env.REACT_APP_BACKEND_URI

if (window.location.hostname === 'svm-61.cs.helsinki.fi') {
  BACKEND_URI = 'http://svm-61.cs.helsinki.fi/projekti-backend'
} else if (window.location.hostname === 'svm-45.cs.helsinki.fi') {
  BACKEND_URI = 'https://studies.cs.helsinki.fi/projekti-backend'
} else if (window.location.hostname === 'studies.cs.helsinki.fi') {
  BACKEND_URI = 'https://studies.cs.helsinki.fi/projekti-backend'
}

if (!BACKEND_URI) BACKEND_URI = 'http://localhost:7001'

export { BACKEND_URI }