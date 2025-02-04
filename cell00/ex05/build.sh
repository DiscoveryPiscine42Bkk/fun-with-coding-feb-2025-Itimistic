#!/bin/bash

for i in "$@"
do mkdir "ex$i"
done

if [ $# -eq 0 ]
then echo "No arguments supplied"
fi
