# API Backend

Express.js API for luvas.io website.

## Features

- RESTful API endpoints
- Contact management (Oreons)
- Static Angular app serving (production)
- Environment-based configuration

## Running

```bash
# Development
npm run dev

# Production
npm run prod
```

## Environment Variables

- `PORT_PROD_API`: Production port (default: 3000)
- `PORT_DEV_API`: Development port (default: 3001)

## API Endpoints

### Contacts
```
GET /api/oreons/contacts - List all contacts
POST /api/oreons/contacts - Add new contact
```

**Request body (POST):**
```json
{
  "name": "John Doe",
  "phone": "123456789", 
  "address": "123 Main St"
}
```

## Production

- Serves built Angular app from `../luvas.io-app/dist/`
- All routes fall back to Angular's index.html
- Runs behind nginx reverse proxy


