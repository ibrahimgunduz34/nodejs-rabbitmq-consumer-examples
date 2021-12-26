const path = require('path');

module.exports = {
    // The rabbitmq host address
    RABBITMQ_HOST: 'amqp://192.168.56.10:5672',

    // The queue for the images to be resized
    QUEUE_IMAGE_RESIZE: 'image_resize',

    // The message count to be fetched from Rabbitmq at once
    PREFETCH_COUNT: 10,

    IMAGE_DIR: path.join(__dirname, '..'),

    OUTPUT_DIR: path.join(__dirname, '..', '.output'),

    REQUIRED_IMAGE_WIDTH: 500,
}