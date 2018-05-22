import * as amqp from 'amqplib'

import {app} from "./app";


export let rabbitConnection
export let rabbitChannel

// implementation subject to change
export let rabbitEvent = ({ exchange, payload }) => {
    if(!rabbitConnection) return console.log('Skipping publishing event because no rabbitmq connection is made')
    publishOnRabbitMQ({ exchange, payload })
}

// normalize publishing
export let publishOnRabbitMQ = ({ exchange, payload }) => {
    if(!rabbitChannel) throw 'RabbitMQ rabbitConnection not ready yet.'
    rabbitChannel.assertExchange(exchange, 'fanout', {durable: false})
    rabbitChannel.publish(exchange, '', new Buffer(JSON.stringify(payload)))
}

/* Run when bootstrapping the application */
export let createRabbitMQConnection = async ({ host, user = null, pass = null }) => {
    rabbitConnection = await amqp.connect(`amqp://${host}`)
    rabbitChannel = await rabbitConnection.createChannel()
    app.emit('rabbitmq-ready')
}
