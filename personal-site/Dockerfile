FROM node:22-alpine

WORKDIR /personal-site

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy all source code
COPY . .

# Install dependencies and build Angular app
WORKDIR /personal-site/luvas.io-api
RUN npm run setup

# Start the application
CMD ["npm", "run", "prod"]

EXPOSE 3000