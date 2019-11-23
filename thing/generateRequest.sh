#!/bin/bash -e
elb=$1
amount=$2

if [[ $# -ne 2 ]] ; then
    echo "Usage: ${0} loadbalancer_dns request_amount"
    exit 1
fi

for ((i=0; i < $amount; i++))
do
    node index.js $elb
    sleep .001
done