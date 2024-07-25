FROM node:18.12.0
COPY . /app/FrontEnd
WORKDIR /app/FrontEnd
RUN npm install -g npm@9.8.1
RUN npm i
EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]

