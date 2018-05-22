import express from 'express'
import {User} from "./models/User";
import jwt from 'jsonwebtoken'
import {app} from "./app";
import bcrypt from 'bcryptjs'
import fs from 'fs'
import {rabbitEvent} from './rabbitmq';
import {newUser} from './actions';
import {config} from "./config";

const router = express.Router()

let privateKey = fs.readFileSync(config('JWT_PRIVATE_KEY'), 'utf-8')
// let publicKey = fs.readFileSync(config('JWT_PUBLIC_KEY'), 'utf-8')

let tkn = user => jwt.sign(user, privateKey, {
    expiresIn: '60m',
    algorithm: 'RS256',
    subject: user._id,
    issuer: 'rc-auth',
    notBefore: 0,
    jwtid: user._id
})

let tknPayload = user => ({
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    image: user.image,
    uuid: user._id.toString()
})

router.post('/register', async (req, res) => {
    let {name, email, password, image} = req.body
    image = image || config('defaultUserImage')

    if(await User.findOne({ email }) !== null)
        return res.status(409).json({ msg: 'User with that email already exists!' })

    let user = await User.create({
        name,
        email,
        image,
        password: bcrypt.hashSync(password, 8)
    })

    res.json({ token: tkn(tknPayload(user)), user: tknPayload(user) })
    rabbitEvent(newUser(user))
})

router.post('/login', (req, res) => {
    let {email, password} = req.body
    User.findOne({ email }).then( user => {
        // no user with that email
        if(!user) return res.status(404).json({ msg: 'no user found' })

        // compare the hashed password with the login request password
        if(!bcrypt.compareSync(password, user.password))
            return res.status(401).json({ msg: 'invalid password' })

        // send back a JWT
        res.json({ token: tkn(tknPayload(user)), user: tknPayload(user) })

        // pass down the pipeline
        return user
    })
})

export { router }
