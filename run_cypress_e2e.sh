#!/bin/bash

set -e

dco='docker-compose -f docker-compose.e2e.yml'

function printProgress() {
    local STAGE=$1
    local TEXT=$2

    local GREEN='\033[0;32m'
    local NC='\033[0m' # No Color

    echo -e "${GREEN}${STAGE}${NC}  ${TEXT}"
}

function install() {
    # PREPARE IMAGES
    printProgress 'INSTALL (0/3)' 'Pulling images for E2E tests...'
    $dco pull db backend nginx

    # build frontend image from current directory, travis will build the latest
    # version for testing
    printProgress 'INSTALL (1/3)' 'Pulled images, building frontend'
    docker build --pull --cache-from ohtuprojektiilmo/ohtufront --tag ohtuprojektiilmo/ohtufront .

    printProgress 'INSTALL (2/3)' 'Installing Cypress globally...'
    npm i -g cypress@^3.1.5

    printProgress 'INSTALL (3/3)' 'Cypress installed, installation complete.'
}

function setup() {
    # Bring up services for tests
    printProgress 'SETUP (0/3)' 'Preparing services for E2E tests. Starting database...'
    $dco up -d db

    printProgress 'SETUP (1/3)' 'Database is up, running migrations'
    $dco run --entrypoint 'npm run db:migrate' --rm backend

    printProgress 'SETUP (2/3)' 'Migrations ran, starting backend, frontend and nginx'
    $dco up -d backend frontend nginx

    printProgress 'SETUP (3/3)' 'Infrastructure is ready!'
}

function teardown() {
    printProgress 'TEARDOWN (0/1)' 'Tearing down infra with docker-compose down'
    $dco down
    printProgress 'TEARDOWN (1/1)' 'Teardown complete!'
}

function run() {
    CYPRESS_baseUrl=http://localhost:3000/projekti npm run cypress:run
}

function open() {
    CYPRESS_baseUrl=http://localhost:3000/projekti npm run cypress:open
}

if [ "$1" == 'run' ]; then
    run
elif [ "$1" == 'open' ]; then
    open
elif [ "$1" == 'install' ]; then
    install
elif [ "$1" == 'setup' ]; then
    setup
elif [ "$1" == 'teardown' ]; then
    teardown
else
    echo "Run ohtuilmo-project's end-to-end (E2E) tests."
    echo ''
    echo 'USAGE:'
    echo "   $0 <run|open|install|setup|teardown>"
    echo ''
    echo '    "install" and "setup" must be run before "run" or "open".'
    echo '    Port 3000 must be available for binding.'
    echo ''
    echo 'Commands:'
    echo ''
    echo '   run'
    echo '      Runs the Cypress tests in CI mode.'
    echo ''
    echo '   open'
    echo '      Opens the Cypress GUI.'
    echo ''
    echo '   install'
    echo '      Pulls required images with docker-compose and'
    echo '      builds the frontend service from the current'
    echo '      directory.'
    echo ''
    echo '   setup'
    echo '      Brings up the docker-compose network so that the tests can be'
    echo '      run.'
    echo ''
    echo '   teardown'
    echo '      Tears down the docker-compose network.'
    echo ''
    exit 1
fi
