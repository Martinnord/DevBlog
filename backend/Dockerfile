FROM node:9

WORKDIR /app

COPY package-lock.json /app

COPY package.json /app

RUN npm install

COPY docker-entrypoint.sh .

RUN npm run migrate

COPY dist .

COPY wait-for-it.sh .

CMD node index.js

ENTRYPOINT [ "docker-entrypoint.sh" ]