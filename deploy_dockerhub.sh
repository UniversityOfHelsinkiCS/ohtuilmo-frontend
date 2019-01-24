#!/bin/bash

# Deployment script used by Travis (.travis.yml) to push master's image to
# DockerHub after successful merge
#
# DON'T RUN MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING! -Joona

docker login -u $DOCKER_USERNAME -p $docker_password
docker build -t ohtuprojektiilmo/ohtufront .
docker push ohtuprojektiilmo/ohtufront