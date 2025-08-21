FROM node:20-alpine

WORKDIR /inflation-form

COPY package*.json ./
RUN npm install --production

COPY . .

ENV PORT=3000
EXPOSE 3000

CMD ["node", "app.js"]
