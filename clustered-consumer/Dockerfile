FROM node:16-alpine

COPY src/ /src
COPY package.json /
COPY sample-image.jpg /

RUN mkdir /.output

VOLUME /.output

RUN npm install

CMD ["/usr/local/bin/npm", "start"]