#!/bin/sh

# Configuration from environment variables
EMAIL=${SSL_EMAIL}
DOMAINS=${SSL_DOMAINS}

echo "Setting up SSL for domains: $DOMAINS"

# Check if certificates exist
if [ ! -f "/etc/letsencrypt/live/luvas.io/fullchain.pem" ]; then
    echo "Generating SSL certificates..."
    
    # Start nginx for ACME challenge
    nginx &
    NGINX_PID=$!
    sleep 5
    
    # Generate certificates
    certbot certonly \
        --webroot \
        --webroot-path=/var/www/html \
        --email "$EMAIL" \
        --agree-tos \
        --no-eff-email \
        -d "$DOMAINS"
    
    kill $NGINX_PID
    
    # Fallback to self-signed if failed
    if [ ! -f "/etc/letsencrypt/live/luvas.io/fullchain.pem" ]; then
        echo "Creating self-signed certificates..."
        mkdir -p /etc/letsencrypt/live/luvas.io
        openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
            -keyout /etc/letsencrypt/live/luvas.io/privkey.pem \
            -out /etc/letsencrypt/live/luvas.io/fullchain.pem \
            -subj "/C=US/ST=State/L=City/O=Org/CN=luvas.io"
    fi
fi

# Setup auto-renewal (only if not already configured)
if ! crontab -l 2>/dev/null | grep -q "certbot renew"; then
    echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -
    echo "Auto-renewal cron job added"
else
    echo "Auto-renewal cron job already exists"
fi

# Start nginx
nginx -g "daemon off;"
