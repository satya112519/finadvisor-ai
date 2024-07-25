FROM node:18.12-alpine3.17 AS build
RUN npm install -g npm@9.8.1
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --omit=dev

COPY . .
RUN npm run build

FROM node:18.12-alpine3.17

# run using node server
WORKDIR /app

COPY --from=build /app/build ./build
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh


EXPOSE 3000

RUN npm install -g serve

# ENTRYPOINT [ "serve", "-s", "build" ]
ENTRYPOINT ["/entrypoint.sh"]