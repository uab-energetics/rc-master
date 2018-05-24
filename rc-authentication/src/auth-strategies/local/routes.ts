import express from 'express'
import {User} from "../../models/User";
import bcrypt from 'bcryptjs'
import {rabbitEvent} from '../../events/rabbitmq';
import {newUser} from '../../events/actions';
import {config} from "node-laravel-config";
import {jwtFromUser, tokenPayloadFromUserModel} from "../../jwt-helpers/jwt";

const localAuthRouter = express.Router()

localAuthRouter.post('/register', async (req, res) => {
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

    res.json({
        token: jwtFromUser(tokenPayloadFromUserModel(user)),
        user: tokenPayloadFromUserModel(user)
    })

    rabbitEvent(newUser(user))
})

localAuthRouter.post('/login', (req, res) => {
    let {email, password} = req.body
    User.findOne({ email }).then( user => {
        // no user with that email
        if(!user) return res.status(404).json({ msg: 'no user found' })

        // compare the hashed password with the login request password
        if(!bcrypt.compareSync(password, user.password))
            return res.status(401).json({ msg: 'invalid password' })

        // send back a JWT
        res.json({
            token: jwtFromUser(tokenPayloadFromUserModel(user)),
            user: tokenPayloadFromUserModel(user)
        })

        // pass down the pipeline
        return user
    })
})

export { localAuthRouter }
