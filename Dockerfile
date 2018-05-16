FROM node:carbon

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build-server

EXPOSE 1717

RUN ["chmod", "+x", "/app/wait-for-it.sh"]

CMD [ "node", "build/server.js" ]