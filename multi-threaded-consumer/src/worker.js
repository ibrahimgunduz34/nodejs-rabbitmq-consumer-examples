'use strict';

const { parentPort, threadId } = require('worker_threads');
const sharp = require('sharp');
const path = require("path");
const config = require("./config");

function parseMessage (message) {
    const data = JSON.parse(Buffer.from(message?.content).toString());
    const source = path.join(config.IMAGE_DIR, data.filename);
    const target = path.join(config.OUTPUT_DIR, `output-${new Date().getTime()}.jpg`);

    return { source, target };
}

async function processImage (source, target) {
    await sharp(source)
        .resize({ width: config.REQUIRED_IMAGE_WIDTH })
        .toFile(target);
}

async function handleMessage (message) {
    const data = parseMessage(message.message);
    try {
        await processImage(data.source, data.target);
        parentPort.postMessage({ message: message.message });
    } catch (error) {
        parentPort.postMessage({ message: message.message, error });
    }
}

parentPort.on('message', handleMessage);