# luvas.io

## Setup

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

#### GENERAL

```bash
git clone https://github.com/miiranta/env
```

## Run

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

