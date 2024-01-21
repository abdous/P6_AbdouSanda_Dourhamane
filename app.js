const express = require('express')
const app = express()
const bodyPerser = require('body-parser');
const mongoose = require('mongoose')
const path = require('path')
require('dotenv/config')

app.use(express.json())
app.use(bodyPerser.json())




mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log('Successfully connnected to MongoDB Atlast!')
    })
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atleast!')
        console.log('dataBaseError', error)

    })

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});




// home page
app.get('/', (req, res, next) => {
    console.log('My server is realy running in the home page')

})

// served images 
app.use('/images', express.static(path.join(__dirname, 'images')))

// import the  routes 
const userRouter = require('./routes/auth')
const saucesRouter = require('./routes/sauces')
app.use('/api/auth/', userRouter)
app.use('/api/sauces/', saucesRouter)


module.exports = app;