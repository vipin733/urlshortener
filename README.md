# URL Shortner , prisma, typescript, nextjs, docker
## how to setup 

## Features

- Authentication
- Create url shortner
## Installation 

### Installation with docker
Requires [Docker](https://www.docker.com/) to run. 

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/vipin733/urlshortener.git
cd urlshortener
```

## RUNING PROJECT

Root folder
##### environment development 
```sh
cp .env.example.docker .env
docker-compose up --build
```
##### deploy tables 
Open new tab terminal 
```sh
docker exec -u 0 urlshortener npx prisma db push
docker exec -u 0 urlshortener npx prisma generate
```

### Installation without docker
Requires [Nodejs](https://nodejs.org/en/), any DB which supported [prisma](https://www.prisma.io) by  to run. 

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/vipin733/urlshortener.git
cd urlshortener
```

## RUNING PROJECT

Root folder
##### environment development 
```sh
cp .env.example .env
npm i 
npx prisma db push
npx prisma generate
npm run dev
```