FROM node:20.14-alpine

WORKDIR /frontend/app

COPY package.json .

RUN npm install

COPY . .

RUN npm build

EXPOSE 80

CMD [ "npm", "run", "preview" ]
