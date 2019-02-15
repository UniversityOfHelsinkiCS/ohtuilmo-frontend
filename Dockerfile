# specify base image
FROM node:8

EXPOSE 3000

WORKDIR /app

# Install serve to run the app - put this first as this can be cached very well.
RUN npm install -g serve@10.1.2

# Copy package files separately to have them in their own cacheable layer
# and to invalidate the "RUN npm install" cache layer if the files have changed.
#
# Run "npm install" before copying src over so that if the packages remain the
# same, we can re-use the layer cache from our previous build --> no need to
# install a gigantic amount of dependencies.
COPY package*.json /app/
# Run "ci" instead of "install" to make sure we get exact deps we think we're
# getting. Downside is that dev deps are downloaded as well.
# As "ci" uses the $HOME/.npm package cache, we can tell Travis to cache that.
RUN npm ci

COPY . /app/

RUN npm run build

# Set entrypoint to serve the app we just built
CMD serve -s build -p 3000