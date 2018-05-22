#!/bin/sh

ssh-keygen -t rsa -b 4096 -f rc-auth.key
openssl rsa -in rc-auth.key -pubout -outform PEM -out rc-auth.key.pub
cat rc-auth.key
cat rc-auth.key.pub
