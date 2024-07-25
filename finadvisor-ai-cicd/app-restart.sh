#!/bin/bash

docker-compose down --remove-orphans
docker-compose pull
docker-compose up -d
docker image prune -f