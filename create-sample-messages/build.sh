#!/bin/sh

CURRENT_DIR=$(dirname "$(readlink -f "$0")")

docker build \
--tag nodejs-image-resize:create-sample-messages \
"$CURRENT_DIR"