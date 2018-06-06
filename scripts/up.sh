#!/bin/sh

docker-compose up -d rc-rabbitmq || exit 1
echo Waiting for rabbitmq...
while ! curl -s http://localhost:15672 >> /dev/null ; do sleep 3; done

echo Starting the remainder of the services
docker-compose up $@