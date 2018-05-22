import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'
import {router} from "./routes";
import { createRabbitMQConnection } from './rabbitmq';
import {config, env} from "./config";

/* LOAD ENVIRONMENT VALUES */
dotenv.config({ path: ".env" });

/* BOOTSTRAP THE APP */
const app = express()
app.set('port', env('PORT') || 80)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

/* CONNECT TO RABBITMQ */
createRabbitMQConnection({ host: config('RABBITMQ_HOST') })

/* CONNECT TO MONGODB */
mongoose.connect(`mongodb://${config('MONGO_HOST')}:27017`)
    .then( _ => app.emit('mongodb-ready') )

/* REGISTER ROUTES */
app.use(router)

app.on('rabbitmq-ready', _ => console.log('connected to rabbitmq'))
app.on('mongodb-ready', _ => console.log('connected to mongodb'))

export { app }
