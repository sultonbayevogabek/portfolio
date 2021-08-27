const router = require('express').Router()
const { generateToken } = require('../modules/jwt')
const editData = require('../modules/edit-data')


router.get('/', async (req, res) => {
    res.render('auth')
})

router.post('/', async (req, res) => {
    if (req.body.password === 'Ogabek19991031') {
        await editData({ userAgent: req.headers['user-agent'] }, 'auth.json')
        res.cookie('token', generateToken({
            userAgent: req.headers['user-agent']
        })).redirect('/admin')
    } else {
        res.redirect('/auth')
    }
})

module.exports = {
    router,
    path: '/auth'
}