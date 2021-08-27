const { verifyToken } = require('../modules/jwt')
const readData = require('../modules/read-data')

const authMiddleware = async (req, res, next) => {
    if (req.cookies['token']) {
        try {
            const authData = await readData('auth.json')
            if (authData.userAgent === verifyToken(req.cookies['token']).userAgent) {
                req.admin = authData
            }
        } catch (e) {
            return res.redirect('/')
        }
    }
    next()
}

const adminMiddleware = async (req, res, next) => {
    if (!req.admin) {
        return res.redirect('/auth')
    }
    next()
}

module.exports = { authMiddleware, adminMiddleware }