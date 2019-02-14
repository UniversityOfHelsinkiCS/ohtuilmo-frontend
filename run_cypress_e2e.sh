#!/bin/bash

set -e

dco='docker-compose -f docker-compose.e2e.yml'

function install() {
    # PREPARE IMAGES
    $dco pull db backend nginx
    # build frontend image from current directory, travis will build the latest
    # version for testing
    $dco build frontend
}

function run() {
    # PREPARE SERVICES FOR TESTS

    # bring up db (1/3)
    $dco up -d db
    # run migrations for backend (2/3)
    $dco run --entrypoint 'npm run db:migrate' --rm backend

    # bring up frontend, backend and nginx (3/3)
    $dco up -d backend frontend nginx

    # Services are now up and running, let's run cypress!
    # don't use --production because we need cypress
    npm install
    CYPRESS_baseUrl=http://localhost:3000/projekti npm run test
}

if [ "$1" == 'run' ]; then
    run
elif [ "$1" == 'install' ]; then
    install
else
    echo "USAGE: $0 [run|install]"
    exit 1
fi
