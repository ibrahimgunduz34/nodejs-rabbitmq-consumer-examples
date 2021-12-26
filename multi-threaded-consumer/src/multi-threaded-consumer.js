'use strict';

const amqplib = require('amqplib');
const config = require("./config");
const { Worker } = require('worker_threads');
const path = require("path");

console.log("Consumer is started.");

const workers = [];

function handleWorkerMessage (channel) {
    return async message => {
        if (message.error) {
            await channel.nack(message.message);
            console.error('The image has failed to process.');
            return;
        }

        await channel.ack(message.message);
    }
}

async function setupWorkerThread (worker, channel) {
    await channel.assertQueue(config.QUEUE_IMAGE_RESIZE);
    await channel.prefetch(config.PREFETCH_COUNT);

    worker.on('message', handleWorkerMessage(channel));

    await channel.consume(config.QUEUE_IMAGE_RESIZE, async (message) => {
        worker.postMessage({ message });
    });
}

async function handleConnection (conn) {
    process.once('SIGINT', async () => {
        console.log('The consumer has been stopped!');

        for(let i = 0; i < workers.length; i++) {
            workers[i].terminate();
        }

        await conn.close();
    });

    for (let i = 0; i < config.MAX_WORKERS_COUNT; i++) {
        const channel = await conn.createChannel();
        const worker = new Worker(path.join(__dirname, 'worker.js'));
        await setupWorkerThread(worker, channel);
        workers.push(worker);
    }
}

amqplib.connect(config.RABBITMQ_HOST)
    .then(handleConnection);
