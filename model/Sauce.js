const mongoose = require('mongoose')

const sauceSchema = mongoose.Schema(
    [{
        userId: {
            type: String,
        },
        name: {
            type: String,
            require: true,
            min: 6,
            max: 255
        },
        manufacturer: {
            type: String,
            require: true,
            min: 6,
            max: 255
        },
        description: {
            type: String,
            require: true,
            min: 20,
            max: 1024
        },
        mainPepper: {
            type: String,
            require: true,
            min: 20,
            max: 1024
        },
        imageUrl: {
            type: String,
            // require: true
        },
        heat: {
            type: Number,
            min: 1,
            max: 10
        },
        likes: { type: Number, },
        dislikes: { type: Number, },
        usersLiked: [],
        usersDisliked: [],
    }]

)

module.exports = mongoose.model('Sauces', sauceSchema)