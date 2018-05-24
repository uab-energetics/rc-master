import {config} from "node-laravel-config";
import {exchangeCodeForAccessToken, fetchUserProfile, findOrCreateUser} from "./github";
import {jwtFromUser, tokenPayloadFromUserModel} from "../../jwt-helpers/jwt";

const express = require('express')
const qs = require('querystring')
const url = require('url')

let githubAuthRouter = express.Router()

githubAuthRouter.get('/oauth/github', (req, res) => {
    res.redirect(config('oauth.github.url') + '?' + qs.stringify({
        client_id: config('oauth.github.clientID'),
        redirect_uri: config('oauth.github.callback'),
        scope: ['user']
    }))
})

githubAuthRouter.get('/oauth/github/callback', async (req, res) => {

    exchangeCodeForAccessToken({
        code: req.query.code,
        clientID: config('oauth.github.clientID'),
        redirectURI: config('oauth.github.callback'),
        clientSecret: config('oauth.github.clientSecret')
    }).then( accessTknRes => {
        console.log('github access token', accessTknRes)

        // Get the user's profile from github
        fetchUserProfile(accessTknRes.access_token)
            .then( userProfile => {
                console.log('github user profile', userProfile)

                // Save the user in our database
                findOrCreateUser(userProfile)
                    .then( user => {

                        // Send back to SPA with JWT
                        res.redirect(url.format({
                            pathname: config('oauth.spaCallback'),
                            query: {
                                jwt: jwtFromUser(tokenPayloadFromUserModel(user))
                            }
                        }))
                    })

            }).catch( err => res.status(500).json(err.error) )

    }).catch( err => res.status(500).json(err.error) )

})

export { githubAuthRouter }