FROM node:19-alpine

WORKDIR /jwt-node

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . .

EXPOSE $PORT

CMD nodemon -L --watch . src/index.js
