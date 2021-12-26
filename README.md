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

## How To Run The Consumers
* Go to project directory and start the virtual machines by running **vagrant up**

```shell
$ vagrant up
```

* Connect `app` machine via ssh.

```shell
$ vagrant ssh app
```

* Create some sample messages.

```shell
$ ./create-sample-messages/run.sh
```

The process would be finished successfully after you see the following output.

```shell
> create-sample-messages@1.0.0 start
> node src/create-sample-messages.js

Creating sample messages...
Done!
```

You can run any consumers by running `run.sh` under the example consumer implementation directories.

```shell
./<consumer-example>/run.sh
```

**Example:**

```shell
./simple-consumer/run.sh
```

The consumer implementations will block the terminal unless it's broken by **CTRL+C**.

## How To Access RabbitMQ Console

* Open your favorite browser and visit [http://192.168.56.10:15672/](http://192.168.56.10:15672/)
* You can login to the console with **username:** guest and **password:** guest
