FROM node:9
WORKDIR /app
COPY package-lock.json /app
COPY package.json /app
RUN npm install
COPY dist /app
COPY wait-for-it.sh /app
CMD node index.js
EXPOSE 3010