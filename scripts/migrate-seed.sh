#!/bin/sh

docker exec -it rc-backend php artisan migrate
