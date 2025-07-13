#!/bin/sh

# Configuration from environment variables
EMAIL=${SSL_EMAIL}
DOMAINS=${SSL_DOMAINS}

echo "Setting up SSL for domains: $DOMAINS"

# Check if certificates exist
if [ ! -f "/etc/letsencrypt/live/luvas.io/fullchain.pem" ]; then
    echo "Generating SSL certificates..."
    
    # Create a minimal nginx config for ACME challenge
    cat > /tmp/acme-nginx.conf << 'EOF'
events {
    worker_connections 1024;
}
http {
    server {
        listen 80;
        server_name _;
        location /.well-known/acme-challenge/ {
            root /var/www/html;
        }
    }
}
EOF
    
    # Start nginx with ACME config
    nginx -c /tmp/acme-nginx.conf &
    NGINX_PID=$!
    sleep 3
    
    # Use webroot authenticator with the running nginx
    certbot certonly \
        --webroot \
        --webroot-path=/var/www/html \
        --email "$EMAIL" \
        --agree-tos \
        --no-eff-email \
        --non-interactive \
        --domains "$DOMAINS"
    
    # Stop the ACME nginx
    kill $NGINX_PID 2>/dev/null || true
    
    # Check if certificates were successfully generated
    if [ ! -f "/etc/letsencrypt/live/luvas.io/fullchain.pem" ]; then
        echo "Failed to generate SSL certificates. Please check your domain configuration and network connectivity."
        exit 1
    fi
    
    echo "SSL certificates generated successfully"
else
    echo "SSL certificates already exist"
fi

# Setup auto-renewal (only if not already configured)
if ! crontab -l 2>/dev/null | grep -q "certbot renew"; then
    echo "0 12 * * * /usr/bin/certbot renew --quiet" | crontab -
    echo "Auto-renewal cron job added"
else
    echo "Auto-renewal cron job already exists"
fi

# Test nginx configuration
echo "Testing nginx configuration..."
nginx -t

if [ $? -eq 0 ]; then
    echo "Nginx configuration is valid"
    # Start nginx
    echo "Starting nginx..."
    nginx -g "daemon off;"
else
    echo "Nginx configuration test failed!"
    exit 1
fi
