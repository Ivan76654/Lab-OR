FROM node:20.14-alpine

WORKDIR /frontend/app

COPY package.json .

RUN npm install

COPY . .

ARG DEFAULT_VITE_SERVER_HOST="http://localhost:8087"

ENV VITE_SERVER_HOST=$DEFAULT_VITE_SERVER_HOST

RUN npm run build

EXPOSE 80

CMD [ "npm", "run", "preview" ]
