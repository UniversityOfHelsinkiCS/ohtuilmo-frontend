#!/bin/bash

# Deployment script used by Travis (.travis.yml) to push master's image to
# DockerHub after successful merge
#
# DON'T RUN MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING! -Joona

DOCKER_TAG_NAME=ohtuprojektiilmo/ohtufront

echo 'Logging in with Docker'
docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD

echo "Building $DOCKER_TAG_NAME"
docker build -t $DOCKER_TAG_NAME .

echo 'Pushing to dockerhub'
docker push $DOCKER_TAG_NAME

echo 'Deployed!'