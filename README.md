# RabbitMQ Consumer Examples With NodeJs

You can find different implementation shapes of RabbitMQ consumers with NodeJS in this repository.

* [Simple Consumer](simple-consumer/README.md)
* [Multi Threaded Consumer](multi-threaded-consumer/README.md)
* [Clustered Consumer](clustered-consumer/README.md)

In order to create some sample messages please check out the following module:
* [Create Sample Messages](create-sample-messages/README.md)

## Requirements:
* [Vagrant](https://www.vagrantup.com/downloads)
* [Virtualbox](https://www.virtualbox.org/wiki/Downloads)
* Free memory space >= 1024 GB

## Running The Consumers
* Go to project directory and start the virtual machines by running **vagrant up**

```aidl
$ vagrant up
```

* Connect `app` machine via ssh.

```aidl
$ vagrant ssh app
```

* Create some sample messages.

```aidl
$ ./create-sample-messages/run.sh
```

The process would be finished successfully after you see the following output.

```aidl
> create-sample-messages@1.0.0 start
> node src/create-sample-messages.js

Creating sample messages...
Done!
```

You can run any consumers by running `run.sh` under the example consumer implementation directories.

```aidl
./<consumer-example>/run.sh
```

**Example:**

```aidl
./simple-consumer/run.sh
```

The consumer implementations will block the terminal unless it's broken by **CTRL+C**.
