#!/bin/sh

ssh-keygen -t rsa -b 4096 -f .keys/rc-auth.key
openssl rsa -in .keys/rc-auth.key -pubout -outform PEM -out .keys/rc-auth.key.pub
cat .keys/rc-auth.key
cat .keys/rc-auth.key.pub
