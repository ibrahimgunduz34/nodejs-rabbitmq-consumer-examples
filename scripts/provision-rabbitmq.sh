#!/bin/bash

docker run \
  --rm \
  --detach \
  --name rabbitmq \
  --publish 15672:15672 \
  --publish 5672:5672 \
  --health-cmd "/opt/rabbitmq/sbin/rabbitmqctl status" \
  --health-interval 2s \
  --health-timeout 30s \
  --health-retries 15 \
  rabbitmq:3.9.11-management-alpine

sleep 10

docker exec rabbitmq rabbitmqadmin declare --vhost="/" exchange name=image_resize_exchange type=direct

docker exec rabbitmq rabbitmqadmin declare --vhost="/" queue name=image_resize

docker exec rabbitmq rabbitmqadmin declare --vhost="/" binding \
  source=image_resize_exchange \
  destination_type=queue \
  destination=image_resize