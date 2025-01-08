ARG NODE_VERSION=20.11.1

FROM node:${NODE_VERSION}-slim

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

RUN npm run build
CMD [ "npm", "run", "start" ]
