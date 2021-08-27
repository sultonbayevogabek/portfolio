const path = require('path')
require('dotenv').config({ path: path.join(__dirname, 'config.env') })

module.exports = {
    PORT: process.env.PORT,
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    SECRET_WORD: process.env.SECRET_WORD
}