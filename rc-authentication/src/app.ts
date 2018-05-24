import express from 'express'

import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import morgan from 'morgan'
import {localAuthRouter} from "./auth-strategies/local/routes";
import { createRabbitMQConnection } from './events/rabbitmq';
import {config, env} from "node-laravel-config";
import {githubAuthRouter} from "./auth-strategies/github/github.routes";

/* LOAD ENVIRONMENT VALUES */
require('./config/config')

/* BOOTSTRAP THE APP */
const app = express()
app.set('port', env('port', 80))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

/* CONNECT TO RABBITMQ */
if(config('rabbitmq.available'))
    createRabbitMQConnection({ host: config('rabbitmq.host') })

/* CONNECT TO MONGODB */
export let db$ = mongoose.connect(`mongodb://${config('mongodb.host')}:27017`)
    .then( _ => app.emit('mongodb-ready') )

/* REGISTER ROUTES */
app.use(githubAuthRouter)
app.use(localAuthRouter)

app.on('rabbitmq-ready', _ => console.log('connected to rabbitmq'))
app.on('mongodb-ready', _ => console.log('connected to mongodb'))

export { app }
