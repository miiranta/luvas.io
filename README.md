# luvas.io

## Setup

#### GENERAL

Install Node.js (22.12.0) and npm (10.9.0).
Install Angular CLI (19).

```bash
git clone https://github.com/miiranta/env
```

#### APP

Project's frontend. Created with Angular.

> Check luvas.io-app/README.md for more information.

> Check luvas.io-app/src/glass/README.md for more information.

```bash
cd luvas.io-app
npm install
```

#### API

> Check luvas.io-api/README.md for more information.

```bash
cd luvas.io-api
npm install
```

## Build and Run

##### Run DEV

Open two terminals!

```bash
cd luvas.io-api
npm run dev
```

```bash
cd luvas.io-app
ng serve
```

##### Run PROD

Only one terminal!

```bash
cd luvas.io-app
ng build

cd ..
cd luvas.io-api
npm run prod
```

##### Docker

Be sure you have Docker installed.

Be sure everything is built!
```bash
git clone https://github.com/miiranta/env

cd luvas.io-app
ng build
```
(Basically, if it works in PROD, it works in Docker.)

Build the image.
```bash
docker build -t luvas.io .
```

Use ```docker save/load``` to transfer the image to the server.

