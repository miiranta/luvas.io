# Personal Website

Angular frontend + Node.js API for luvas.io.


## Development

```bash
cd luvas.io-api
npm run setup
```

```bash
# API (terminal 1)
cd luvas.io-api
npm run dev

# Frontend (terminal 2)  
cd luvas.io-app
ng serve
```

Access at http://localhost:4200

## Production

Runs via Docker Compose.

## Environment

- `PORT_PROD_API`: Production port (default: 3000)
- `PORT_DEV_API`: Development port (default: 3001)

