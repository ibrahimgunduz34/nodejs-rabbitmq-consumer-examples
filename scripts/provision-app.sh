#!/bin/bash

echo "cd /vagrant" >> /home/vagrant/.bashrc

cd /vagrant || exit

./create-sample-messages/build.sh
./simple-consumer/build.sh
./multi-threaded-consumer/build.sh
./clustered-consumer/build.sh