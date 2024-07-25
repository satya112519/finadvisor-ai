#!/bin/sh

sed -i "s|API_URL|$API_URL|g" /app/build/static/js/main.*.js

# Run the app
serve -s /app/build -l 3000