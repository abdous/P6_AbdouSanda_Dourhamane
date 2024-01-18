// const { route } = require('../app')
const router = require('express').Router()
const User = require('../model/User')
const becrypt = require('bcryptjs')
const { loginValidation, registrationValidation } = require('../validation')


// users page
router.get('/', (req, res, next) => {
    res.send({
        message: "inside the registration"
    })
})

// login page
router.post('/registration', async (req, res, next) => {
    const salt = await becrypt.genSalt(10)
    const enCryptedPswd = await becrypt.hash(req.body.passWord, salt)
    // lets validate the user data
    const { error } = registrationValidation(req.body)
    if (error) return res.status(404).send(error.details[0].message)

    // checking if user email already exist or not
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send({ message: 'Email already exist' })

    const user = new User({
        email: req.body.email,
        passWord: enCryptedPswd
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

module.exports = router