#!/bin/sh

docker exec -it rc-backend php artisan migrate
docker exec -it rc-authorization npm run seed-db