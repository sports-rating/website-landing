ARG NODE_VERSION=20.19.0
FROM node:${NODE_VERSION}-slim AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:${NODE_VERSION}-slim AS runner

WORKDIR /app

COPY --from=builder /app/package.json /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist  # or /build depending on framework

EXPOSE 3000

CMD ["yarn", "start"]
