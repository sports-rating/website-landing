ARG NODE_VERSION=20.19.0

FROM node:${NODE_VERSION}-slim

ARG NUXT_API_BASE
ENV NUXT_API_BASE=${NUXT_API_BASE}

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

RUN npm run build
CMD [ "npm", "run", "start" ]
