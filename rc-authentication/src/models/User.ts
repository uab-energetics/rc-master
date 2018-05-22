import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const User = mongoose.model('User', new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    bio: String,
    website: String,
    department: String,
    theme: String
}))
