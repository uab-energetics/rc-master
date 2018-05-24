import {User} from "../../models/User";
import {rabbitEvent} from "../../events/rabbitmq";
import {newUser} from "../../events/actions";

const axios = require('axios')
const qs = require('querystring')


/* TYPINGS FOR GITHUB API */

const TOKEN_EXCHANGE_URL = 'https://github.com/login/oauth/access_token'

interface UserProfileResponse {
    avatar_url: string
    email: string
    name: string
}

interface AccessTokenResponse {
    access_token: string
}


/* SERVICE FUNCTIONS FOR GITHUB API */

/**
 * Calls the GitHub API using the user's access token
 *
 * @param accessToken
 * @returns {Promise<UserProfileResponse>}
 */
export let fetchUserProfile = (accessToken): Promise<UserProfileResponse> => {
    return axios.get('https://api.github.com/user', {
        params: {
            access_token: accessToken
        }
    }).then( res => res.data )
}


/**
 * Retrieves an access token using the oauth temporary code
 *
 * @param {any} code
 * @param {any} clientID
 * @param {any} redirectURI
 * @param {any} clientSecret
 * @returns {Promise<AccessTokenResponse>}
 */
export let exchangeCodeForAccessToken = ({ code, clientID, redirectURI, clientSecret }): Promise<AccessTokenResponse> => {
    return axios.post(TOKEN_EXCHANGE_URL, {
        code,
        client_id: clientID,
        redirect_uri: redirectURI,
        client_secret: clientSecret
    }).then(response => qs.parse(response.data))
}

export let findOrCreateUser = async (profileData: UserProfileResponse) => {

    let user = await User.findOne({ email: profileData.email })
    if(user) return user

    rabbitEvent(newUser(user))
    return await User.create({
        name: profileData.name,
        image: profileData.avatar_url,
        email: profileData.email
    })
}
