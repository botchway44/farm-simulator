FROM node:latest

RUN mkdir -p /farmsimulator

WORKDIR /farmsimulator

COPY package.json /farmsimulator/

RUN npm install

COPY . /farmsimulator

RUN npm run build
ENV PORT=3000

EXPOSE 3000

CMD [ "npm", "start" ]