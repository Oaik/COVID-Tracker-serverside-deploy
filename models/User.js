const mongoose = require('mongoose')
const Schema = mongoose.Schema

const { validateEmail } = require('./validations/user')

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, 'Please fill a valid email address']
    },
    password: {
        type: String,
        min: 3,
        max: 16,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })

const User = mongoose.model('user', UserSchema)
module.exports = User
