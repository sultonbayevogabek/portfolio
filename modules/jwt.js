const { SECRET_WORD } = require('../config')
const Jwt = require('jsonwebtoken')

const generateToken = payload => Jwt.sign(payload, SECRET_WORD),
    verifyToken = token => Jwt.verify(token, SECRET_WORD)

module.exports = { generateToken, verifyToken }