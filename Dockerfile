FROM node:latest

RUN mkdir -p /farmsimulator

WORKDIR /farmsimulator

COPY package.json /farmsimulator/

RUN npm install

COPY . /farmsimulator

RUN npm run build
ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "start" ]