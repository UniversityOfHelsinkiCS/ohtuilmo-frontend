# specify base image
FROM node:8

# set working directory 
WORKDIR /app

# copy files and install dependencies
# copy package.json and package-lock.json separately so docker can skip rebuild
# the layers if they haven't changed
COPY package.json package-lock.json /app/
COPY . /app/

RUN npm install

# specify which port to expose
EXPOSE 3000

CMD ["npm", "run", "server"]