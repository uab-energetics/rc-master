import {initConfig} from "node-laravel-config";
import {env} from "node-laravel-config";
import {initEnvironment} from "node-laravel-config/dist";

const dotenv = require('dotenv')

dotenv.config({ path: ".env" });
initEnvironment(process.env)

initConfig({

    defaultUserImage: env("USER_IMAGE", "https://qualiscare.com/wp-content/uploads/2017/08/default-user.png"),

    oauth: {

        spaCallback: env('SPA_OAUTH_CALLBACK', 'http://localhost'),

        github: {
            url: env('GITHUB_URL', 'https://github.com/login/oauth/authorize'),
            callback: env('GITHUB_CALLBACK', 'http://localhost:7000/oauth/github/callback'),
            clientID: env('GITHUB_CLIENT_ID'),
            clientSecret: env('GITHUB_SECRET')
        }
    },

    rabbitmq: {
        available: false,
        host: env('RABBITMQ_HOST')
    },

    jwt: {
        privateKey: env('JWT_PRIVATE_KEY', './keys/priv.pem'),
        publicKey: env('JWT_PUBLIC_KEY', './keys/jwt.pub')
    },

    mongodb: {
        host: env('MONGO_HOST', 'database'),
        user: env('MONGO_USER'),
        pass: env('MONGO_PASS'),
        db: env('MONGO_DB')
    }

})
