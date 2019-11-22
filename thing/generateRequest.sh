#!/bin/bash -e
amount=$1

if [[ $# -ne 1 ]] ; then
    echo "Usage: ${0} request_amount"
    exit 1
fi

for ((i=0; i < $amount; i++))
do
    node index.js 1
    sleep .001
done