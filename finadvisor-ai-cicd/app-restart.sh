#!/bin/bash

# Stop and remove all containers, networks, and volumes associated with the Docker Compose file
docker compose down --remove-orphans && \

# Remove all Docker images (forcefully)
docker rmi -f $(docker images -aq) && \

# Remove all unused Docker volumes
docker volume prune -f --all && \

# Pull the latest images defined in the Docker Compose file
docker compose pull && \

# Start up the containers defined in the Docker Compose file in detached mode
docker compose up -d && \

# Remove dangling Docker images
docker image prune -f