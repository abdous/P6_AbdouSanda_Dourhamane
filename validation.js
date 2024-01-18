const Joi = require('@hapi/joi')
const loginValidation = (data) => {

    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        passWord: Joi.string().min(6).required()
    })
    return schema.validate(data)
}
const registrationValidation = (data) => {

    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        passWord: Joi.string().min(6).required()
    })
    return schema.validate(data)
}

module.exports.loginValidation = loginValidation
module.exports.registrationValidation = registrationValidation