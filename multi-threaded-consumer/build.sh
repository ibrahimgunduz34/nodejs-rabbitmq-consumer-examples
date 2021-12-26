#!/bin/sh

CURRENT_DIR=$(dirname "$(readlink -f "$0")")

docker build \
--tag nodejs-image-resize:multi-threaded-consumer \
"$CURRENT_DIR"