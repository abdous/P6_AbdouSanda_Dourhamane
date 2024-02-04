const JWT = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.header('Authorization').split(' ')[1]
    if (!token) return res.status(401).send("Access-Denied")

    try {
        const verified = JWT.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        next()

    } catch (err) {
        res.status(404).send({ message: "Invalid User" })
    }
}