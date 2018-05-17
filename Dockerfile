FROM node:carbon

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10

RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/mongodb.list

RUN apt-get update

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build-server

EXPOSE 1717

RUN apt-get install -y mongodb

CMD ["node", "build/server.js"]
