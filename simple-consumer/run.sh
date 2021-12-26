#!/bin/sh

DOCKER_IMAGE="nodejs-image-resize:simple-consumer"

if  [ -z "$(docker images -q $DOCKER_IMAGE 2> /dev/null)" ]; then
  echo "Please run build.sh first."
  exit 1
fi

docker run \
--rm \
$DOCKER_IMAGE
