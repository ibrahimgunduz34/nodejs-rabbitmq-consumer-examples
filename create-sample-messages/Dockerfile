FROM node:16-alpine

COPY src/ /src
COPY package.json /

RUN npm install

CMD ["/usr/local/bin/npm", "start"]