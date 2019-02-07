// This environmental variable is injected when `npm run build` is ran.
// It is essentially hardcoded into the distributed production build.
// This should be set in docker-compose.yml.
// The REACT_APP_ prefix is needed so that react-scripts passes through the env
// var.
const BACKEND_URI = process.env.REACT_APP_CLIENTSIDE_BACKEND_URI

// Create-react-app injects this environment variable from package.json's
// "homepage" property.
// e.g. if
// "homepage": "http://cs.helsinki.fi/projekti"
// then
// PUBLIC_URL = '/projekti'
// In local dev, this is ''
const PUBLIC_URL = process.env.PUBLIC_URL

export { BACKEND_URI, PUBLIC_URL }