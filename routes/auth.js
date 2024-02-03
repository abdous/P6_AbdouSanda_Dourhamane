// const { route } = require('../app')
const router = require('express').Router()
const User = require('../model/User')
const becrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const { loginValidation, signupValidation } = require('../validation')


// get all users
router.get('/', (req, res, next) => {
    res.send({
        message: "inside the home page"
    })
})

// signup page
router.post('/signup', async (req, res, next) => { //auth/signup
    const salt = await becrypt.genSalt(10)
    const enCryptedPswd = await becrypt.hash(req.body.password, salt)
    // lets validate the user data
    const { error } = signupValidation(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    // checking if user email already exist or not
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send({ message: 'Email already exist' })

    const user = new User({
        email: req.body.email,
        password: enCryptedPswd
    })


    try {
        const savedUser = await user.save()
        res.status(200).send({ user: { id: savedUser._id } })

    } catch (error) {
        res.status(400).send({
            status: "failed",
            message: error
        })

    }

})


// login page 
router.post('/login', async (req, res) => {

    // lets validate the user data for login
    const { error } = loginValidation & (req.body)
    if (error) return res.status(404).send(error.details[0].message)

    // checking the user email
    const userExist = await User.findOne({ email: req.body.email })
    if (!userExist) return res.status(404).send({ message: 'Invalid Email' })

    // checking user password
    const userHasValidePass = await becrypt.compare(req.body.password, userExist.password)
    if (!userHasValidePass) return res.status(200).send('user does not have a valid password')

    // creating a token for the user
    const token = JWT.sign({ _id: userExist._id }, process.env.TOKEN_SECRET)
    res.header('Authorization', token).send({ token: token, userId: userExist._id })

})


module.exports = router