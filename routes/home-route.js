const router = require('express').Router()
const readData = require('../modules/read-data')

router.get('/', async (req, res) => {
    res.render('index', {
        title: `Og'abek Sultonbayev Portfolio`,
        data: await readData('portfolio.json')
    })
})

module.exports = {
    path: '/',
    router
}
