let BACKEND_URI = process.env.REACT_APP_BACKEND_URI

if (window.location.hostname === 'svm-61.cs.helsinki.fi') {
  BACKEND_URI = 'http://svm-61.cs.helsinki.fi:7001'
} else if (window.location.hostname === 'svm-45.cs.helsinki.fi') {
  BACKEND_URI = 'http://svm-45.cs.helsinki.fi:7001'
}

if (!BACKEND_URI) BACKEND_URI = 'http://localhost:7001'

export { BACKEND_URI }