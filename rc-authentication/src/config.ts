
export const env = (key, def = null) => process.env[key] || def

export const config = (key, def = null) => {
    let val = _config[key] || def
    if(!val) throw "Tried to access invalid setting with no default set: " + key
    return val
}

const _config = {

    defaultUserImage: env("USER_IMAGE", "https://qualiscare.com/wp-content/uploads/2017/08/default-user.png"),

    RABBITMQ_HOST: env('RABBITMQ_HOST'),

    MONGO_HOST: env('MONGO_HOST'),
    JWT_PRIVATE_KEY: env('JWT_PRIVATE_KEY'),
    JWT_PUBLIC_KEY: env('JWT_PUBLIC_KEY'),

    MONGO_USER: env('MONGO_USER'),
    MONGO_PASS: env('MONGO_PASS'),
    MONGO_DB: env('MONGO_DB'),

}

