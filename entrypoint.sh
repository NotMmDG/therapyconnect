#!/bin/sh

echo "DOMAIN is set to: $DOMAIN"

if [ -z "$DOMAIN" ]; then
  echo "ERROR: DOMAIN environment variable is not set!"
  exit 1
fi

envsubst '$DOMAIN' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
cat /etc/nginx/conf.d/default.conf  # Debug output
nginx -g 'daemon off;'
