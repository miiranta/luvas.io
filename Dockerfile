FROM node:22-alpine

WORKDIR /app

COPY . /app

WORKDIR /app/luvas.io-api
CMD ["npm", "run", "prod"]

EXPOSE 4000