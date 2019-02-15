[![Build Status](https://travis-ci.org/ohtuprojekti-ilmo/ohtuilmo-frontend.svg?branch=master)](https://travis-ci.org/ohtuprojekti-ilmo/ohtuilmo-frontend)

## Description

Sign up tool for University of Helsinki's software production course

- [Backlog](https://trello.com/b/Wv50WMSA/backlog)
- [Backend](https://github.com/ohtuprojekti-ilmo/ohtuilmo-backend)

## Instructions
- [How to start frontend, backend and database using docker-compose](https://github.com/ohtuprojekti-ilmo/ohtuilmo-frontend/wiki)

### How to start frontend for local development
- Clone project
- Start the backend server on `localhost:7001` or change package.json's "proxy" address to point to wherever you're running the backend in local development
    - Easiest way is to use docker-compose and set the backend's host port to `7001`
- Run project
    ```
    $ npm install
    $ npm start
    ```

### Writing and running Cypress tests locally

#### Writing tests

The test specs can be found in `e2e/cypress/integration`.

#### If you're writing a frontend-only feature which works with the Docker image in DockerHub

In this case, you can just start the backend using the DockerHub image.

1. Start `db` and `backend` with docker-compose normally, no need to specifically use the `.e2e.yml` file.
2. Check which port the backend is running on
    - In frontend's `package.json`, set `"proxy": "http://localhost:<PORT>"` to the correct port so that the frontend's /api calls get proxied to the backend
        - Probably easiest if you use the port found in the file as the host port in docker-compose.
        - Don't commit this change, it's not needed in production and it changes per developer really.
3. Start the frontend with `npm start`
4. Run Cypress. Check which port the frontend is running on, pass it to Cypress before opening it
    - There's [multiple ways](https://docs.cypress.io/guides/guides/environment-variables.html#Setting) to pass this information to Cypress, the easiest for you probably is to do:
        ```sh
        CYPRESS_baseUrl=http://localhost:<PORT> npm run cypress:open
        ```
        or
        ```
        npm run cypress:open -- --env CYPRESS_baseUrl=http://localhost:<PORT>
        ```
        The `baseUrl` lets Cypress know which host to direct its requests when we do `cy.visit('/')`. Alternatively

#### If you're writing a feature that touches both the frontend and backend

Same instructions as above but you only start `db` with docker-compose.

### Running end-to-end tests

The full E2E test suite can be run locally, but notice that it builds the frontend image from the frontend directory, meaning that you can't interactively edit your code and the tests.

Run:
- npm run e2e:install
- npm run e2e:setup
- npm run e2e:run or npm run e2e:open
- npm run e2e:teardown

The E2E tests set up nginx, backend, frontend and the database with docker-compose, then run the Cypress tests using nginx's port.

### Docker instructions

[Docker cheatsheet](https://github.com/jexniemi/Docker-cheat-page/wiki)


