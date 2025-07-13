FROM nginx:alpine

# Install certbot for Let's Encrypt
RUN apk add --no-cache certbot

# Create webroot directory for ACME challenge
RUN mkdir -p /var/www/html

# Copy files
COPY nginx.conf /etc/nginx/nginx.conf
COPY ssl-setup.sh /usr/local/bin/ssl-setup.sh
RUN chmod +x /usr/local/bin/ssl-setup.sh

EXPOSE 80 443 25565

CMD ["/usr/local/bin/ssl-setup.sh"]
