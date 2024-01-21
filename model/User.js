const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 1024
    },
    date: {
        type: String,
        default: Date.now()
    }
})

module.exports = mongoose.model('Users', userSchema)