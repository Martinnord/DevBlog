FROM node:9
WORKDIR /app
COPY package-lock.json /app
COPY package.json /app
RUN npm install
RUN cp docker-entrypoint.sh /usr/local/bin/ && \ chmod +x /usr/local/bin/docker-entrypoint.sh
COPY dist .
COPY wait-for-it.sh .
CMD node index.js
