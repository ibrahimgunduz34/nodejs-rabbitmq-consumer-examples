const path = require('path');

module.exports = {
    // The rabbitmq host address
    RABBITMQ_HOST: 'amqp://192.168.56.10:5672',

    // The queue for the images to be resized
    QUEUE_IMAGE_RESIZE: 'image_resize',

    // Maximum sample message count to be created
    MAX_MESSAGE_COUNT: 5000,
}