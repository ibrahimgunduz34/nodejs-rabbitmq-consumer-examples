'use strict';

const amqplib = require('amqplib');
const config = require('./config');

async function generateSampleMessages(channel) {
    await channel.assertQueue(config.QUEUE_IMAGE_RESIZE);

    const messageData = {"filename": "sample-image.jpg"};
    const message = JSON.stringify(messageData);

    for (let i = 0; i < config.MAX_MESSAGE_COUNT; i++) {
        await channel.sendToQueue(config.QUEUE_IMAGE_RESIZE, Buffer.from(message));
    }
}

async function handleConnection(conn) {
        const channel = await conn.createChannel();

        await generateSampleMessages(channel);

        await channel.close();
        await conn.close();
}

console.log("Creating sample messages...");

amqplib.connect(config.RABBITMQ_HOST)
    .then(handleConnection)
    .then(() => { console.log("Done!"); });
