FROM node:14-alpine

WORKDIR /app

RUN apk add --no-cache --virtual build-dependencies make gcc g++ python git
COPY package*.json ./
RUN npm ci
RUN ls
RUN apk del build-dependencies

COPY ./ /app

CMD [ "npm", "run", "start:dev" ]