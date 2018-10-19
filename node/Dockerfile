FROM node:alpine

# File Author / Maintainer
LABEL maintainer="thomas.kolar@gmail.com"

# Install nodemon
RUN npm install -g nodemon

# Provides cached layer for node_modules
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /app && cp -a /tmp/node_modules /app/

# Define working directory
WORKDIR /app
ADD . /app

# Expose port
EXPOSE 3000

# Run app using nodemon
CMD ["nodemon", "/app/index.js"]