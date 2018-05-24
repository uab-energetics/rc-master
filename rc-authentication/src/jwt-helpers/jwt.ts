import fs from "fs";
import * as jsonwebtoken from 'jsonwebtoken'
import {config} from "node-laravel-config";

export interface TokenUserPayload {
    _id: string
    name: string
    email: string
    image: string
    uuid: string
}

export let jwtFromUser = (user: TokenUserPayload) => {
    const privateKeyPath = config('jwt.privateKey')
    let privateKey = fs.readFileSync(privateKeyPath, 'utf-8')
    return jsonwebtoken.sign(user, privateKey, {
        expiresIn: '60m',
        algorithm: 'RS256',
        subject: user._id,
        issuer: 'rc-auth',
        notBefore: 0,
        jwtid: user._id
    })
}

export let tokenPayloadFromUserModel = (user): TokenUserPayload => ({
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    image: user.image,
    uuid: user._id.toString()
})
