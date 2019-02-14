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

function prepareImages() {
    # PREPARE IMAGES
    printProgress 'INSTALL (0/2)' 'Pulling images for E2E tests...'
    $dco pull db backend nginx

    # build frontend image from current directory, travis will build the latest
    # version for testing
    printProgress 'INSTALL (1/2)' 'Pulled images, building frontend'
    $dco build frontend

    printProgress 'INSTALL (2/2)' 'Images ready for E2E'
}

function prepareServices() {
    # PREPARE SERVICES FOR TESTS

    # bring up db (1/3)
    printProgress 'PREPARE (0/4)' 'Preparing services for E2E tests. Starting database...'
    $dco up -d db

    printProgress 'PREPARE (1/4)' 'Database is up, running migrations'
    $dco run --entrypoint 'npm run db:migrate' --rm backend

    printProgress 'PREPARE (2/4)' 'Migrations ran, starting backend, frontend and nginx'
    $dco up -d backend frontend nginx

    printProgress 'PREPARE (3/4)' 'Infrastructure is ready, installing Cypress'
    # install only Cypress, no need to spend time installing react-scripts
    # will break if we require() some dependency in the integration tests!
    local CYPRESS_VERSION=$(node -p "require('./package.json').devDependencies.cypress")
    npm install --no-save "cypress@${CYPRESS_VERSION}"

    printProgress 'PREPARE (4/4)' 'Cypress installed! Ready to run.'
}

function run() {
    prepareServices

    # don't exist if npm run test fails, we need to bring infra down afterwards
    set +e
    CYPRESS_baseUrl=http://localhost:3000/projekti npm run cypress:run
    local TEST_RETURN_CODE=$?

    $dco down
    if [ "${TEST_RETURN_CODE}" != '0' ]; then
        exit $TEST_RETURN_CODE
    fi
}

function open() {
    prepareServices

    set +e
    CYPRESS_baseUrl=http://localhost:3000/projekti npm run cypress:open
    local TEST_RETURN_CODE=$?

    $dco down
    if [ "${TEST_RETURN_CODE}" != '0' ]; then
        exit $TEST_RETURN_CODE
    fi
}

if [ "$1" == 'run' ]; then
    run
elif [ "$1" == 'open' ]; then
    open
elif [ "$1" == 'prepare-images' ]; then
    prepareImages
else
    echo "Run ohtuilmo-project's end-to-end (E2E) tests."
    echo ''
    echo 'USAGE:'
    echo "   $0 <run|open|prepare-images>"
    echo ''
    echo '    The prepare-images command must be run before "run" or "watch".'
    echo '    Port 3000 must be available for binding.'
    echo ''
    echo 'Commands:'
    echo ''
    echo '   run'
    echo '      Runs the Cypress tests in CI mode.'
    echo '   open'
    echo '      Opens the Cypress GUI.'
    echo '   prepare-images'
    echo '      Pulls required images with docker-compose and'
    echo '      builds the frontend service from the current'
    echo '      directory.'
    echo ''
    exit 1
fi
