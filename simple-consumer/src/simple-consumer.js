'use strict';

const amqplib = require('amqplib');
const config = require("./config");
const path = require("path");
const sharp = require("sharp");

function parseMessage (message) {
    const data = JSON.parse(message.content?.toString());
    const source = path.join(config.IMAGE_DIR, data.filename);
    const target = path.join(config.OUTPUT_DIR, `output-${new Date().getTime()}.jpg`);

    return { source, target };
}

async function processImage (source, target) {
    await sharp(source)
        .resize({ width: config.REQUIRED_IMAGE_WIDTH })
        .toFile(target);
}

function handleIncomingMessage (channel) {
    return async message => {
        const data = parseMessage(message);
        try {
            await processImage(data.source, data.target);
            await channel.ack(message);
        } catch (error) {
            console.error(`Failed to process ${data.source}`);
            await channel.nack(message);
        }
    }
}

async function handleConnection (conn) {
    process.once('SIGINT', async () => {
        console.log('The consumer has been stopped!')
        await conn.close();
    });

    const channel = await conn.createChannel();

    await channel.assertQueue(config.QUEUE_IMAGE_RESIZE);
    await channel.prefetch(config.PREFETCH_COUNT);

    await channel.consume(config.QUEUE_IMAGE_RESIZE, handleIncomingMessage(channel));
}

console.log("Consumer is started.");

amqplib.connect(config.RABBITMQ_HOST)
    .then(handleConnection);
