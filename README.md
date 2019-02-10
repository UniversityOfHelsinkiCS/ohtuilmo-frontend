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

### Docker instructions

[Docker cheatsheet](https://github.com/jexniemi/Docker-cheat-page/wiki)


