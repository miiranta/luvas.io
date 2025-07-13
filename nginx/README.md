# Nginx

Automatic SSL proxy for luvas.io services.

## Configuration

Environment variables in docker-compose.yml:
- `SSL_EMAIL`: Email for Let's Encrypt
- `SSL_DOMAINS`: Comma-separated domains for SSL

## Commands

```bash
# View certificates
docker-compose exec nginx certbot certificates

# Renew certificates manually
docker-compose exec nginx certbot renew

# Reload nginx
docker-compose exec nginx nginx -s reload
```
