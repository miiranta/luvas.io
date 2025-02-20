# luvas.io (Backend)

## SSL Setup (Greenlock)
> Built with Greenlock Express (a Root project).

```bash
npx greenlock init --maintainer-email "your email"
```

```bash
npx greenlock add --subject "luvas.io" --altnames luvas.io,www.luvas.io
```

Edit maintainer email at server.js.

Add author to package.json.


## API

#### Oreons - Contacts task

```bash
Listing contacts

GET /api/oreons/contacts

returns 
[
    {
      "id": 1,
      "name": "John Doe",
      "phone": "123456789",
      "address": "1234 Main St",
    }
]
```

```bash
Adding a contact

POST localhost:3000/api/oreons/contacts
body
{
    "name": "John Doe",
    "phone": "123456789",
    "address": "1234 Main St",
}

returns
[
    {
      "id": 1,
      "name": "John Doe",
      "phone": "123456789",
      "address": "1234 Main St",
    }
]
```

```bash
Updating a contact

PUT localhost:3000/api/oreons/contacts/:id
body
{
    "name": "John Doe",
    "phone": "123456789",
    "address": "1234 Main St",
}

returns
[
    {
      "id": 1,
      "name": "John Doe",
      "phone": "123456789",
      "address": "1234 Main St",
    }
]
```

```bash
Deleting a contact

DELETE localhost:3000/api/oreons/contacts/:id

returns
[]
```


