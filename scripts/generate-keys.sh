#!/bin/sh

KEYSDIR=$(dirname "$0")/../.keys

mkdir -p $KEYSDIR
ssh-keygen -t rsa -b 4096 -f $KEYSDIR/rc-auth.key
openssl rsa -in $KEYSDIR/rc-auth.key -pubout -outform PEM -out $KEYSDIR/rc-auth.key.pub
cat $KEYSDIR/rc-auth.key
cat $KEYSDIR/rc-auth.key.pub
