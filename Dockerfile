# Common build stage
# FROM node:16 as common-build-stage

# COPY . ./src/server/app

# WORKDIR /src/server/app

# RUN npm i --force

# EXPOSE 3000

# FROM common-build-stage as development-build-stage

# CMD ["yarn", "dev"]
FROM node:16


WORKDIR /src/client/urlshortener

COPY package*.json ./


RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
