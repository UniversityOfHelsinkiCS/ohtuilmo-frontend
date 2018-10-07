[![Build Status](https://travis-ci.org/ohtuprojekti-ilmo/ohtuilmo-frontend.svg?branch=master)](https://travis-ci.org/ohtuprojekti-ilmo/ohtuilmo-frontend)

## Description

Sign up tool for University of Helsinki's software production course

- [Backlog](https://trello.com/b/Wv50WMSA/backlog)
- [Backend](https://github.com/ohtuprojekti-ilmo/ohtuilmo-backend)

## Instructions

- Clone project
- Create .env file to the project root and add address to backend server (ie. `http://localhost:3001` if you're running backend in port 3001)

```
REACT_APP_BACKEND_URI='backend server address'
```

- Run project

```
$ npm install
$ npm start
```

## Docker instructions 
[Docker cheatsheet](https://github.com/jexniemi/Docker-cheat-page/wiki)  
  
### For running locally
Download docker-compose.yml from [here](https://docs.google.com/document/d/1mKKaYJzuDH94uW6L78fLpfyCV9_ETWjh6JslvPurKho/edit?usp=sharing)  
Make sure docker and docker-compose are installed, and run `docker-compose up` in the same directory where you placed the docker-compose.yml file  
The app should be running at localhost:7000

### Running on a server
At the moment, the frontend assumes the backend is running at localhost:7001, so you need to port forward your localhost:7001 to whatever port the backend is running in on the server.
