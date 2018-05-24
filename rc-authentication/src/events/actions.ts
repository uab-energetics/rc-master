

export const userChange = (userModel) => {
    return {
        exchange: 'rc-auth.users.changed',
        payload: {
            user: userModel
        }
    }
}

export const newUser = (userModel) => {
    return {
        exchange: 'rc-auth.users.created',
        payload: {
            user: userModel
        }
    }
}