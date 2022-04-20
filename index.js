const { Kafka } = require('kafkajs')
const kafka = new Kafka({
    clientId: 'generator-app',
    brokers: process.env.KAFKA_BROKERS.split(","),
    connectionTimeout: 5000,
    authenticationTimeout: 5000,
    reauthenticationThreshold: 20000,
    ssl: true,
    sasl: {
        mechanism: 'plain', 
        username: process.env.KAFKA_USERNAME,
        password: process.env.KAFKA_PASSWORD
     },
});

// Create delay function
const delay = (ms) => new Promise(res => setTimeout(res, ms));

messageHandler = async ({ topic, partition, message }) => {
    // Call delay function
    await delay(process.env.INTERVAL);
    console.log(`Received message ${message.value.toString()} on ${topic}-${partition}`)
}

const consumer = kafka.consumer({ groupId: process.env.GROUP_ID });

consumer.connect()
.then(() => {
    console.log('Consumer connected')
    return consumer.subscribe({ topic: process.env.KAFKA_TOPIC  })
})
.then(() => {
    consumer.run({eachMessage: messageHandler})
})
.catch(error => {
    console.error(error)
})


