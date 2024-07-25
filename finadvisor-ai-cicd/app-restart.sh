#!/bin/bash

docker compose down --remove-orphans
docker rmi -f $(docker images -aq)
docker volume prune  -f --all
docker compose pull
docker compose up -d
docker image prune -f