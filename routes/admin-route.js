const path = require('path')
const fs = require('fs/promises')
const router = require('express').Router()
const fileUpload = require('express-fileupload')
const { v4: uuid } = require('uuid')
const { adminMiddleware } = require('../middlewares/auth-middleware')
const readData = require('../modules/read-data')
const editData = require('../modules/edit-data')

router.get('/', adminMiddleware, async (req, res) => {
    res.render('admin', {
        data: await readData('portfolio.json')
    })
})

router.post('/profileImg', fileUpload(), async (req, res) => {
    const profileImg = req.files.profileImg
    const profileImgPath = path.join(__dirname, '..', 'public', 'img', 'me.' + profileImg.mimetype.split('/')[1])
    await profileImg.mv(profileImgPath)
    const portfolioData = await readData('portfolio.json')
    portfolioData.profileImg = '/img/me.' + profileImg.mimetype.split('/')[1]
    await editData(portfolioData, 'portfolio.json')
    res.send({
        message: 'changed'
    })
})

router.get('/remove-job/:job', adminMiddleware, async (req, res) => {
    const portfolioData = await readData('portfolio.json')
    let { jobs } = portfolioData
    jobs = jobs.filter(job => job !== req.params.job)
    portfolioData.jobs = jobs
    await editData(portfolioData, 'portfolio.json')
    res.redirect('/admin')
})

router.post('/add-job', async (req, res) => {
    const { job } = req.body
    const portfolioData = await readData('portfolio.json')
    portfolioData.jobs.push(job)
    await editData(portfolioData, 'portfolio.json')
    res.redirect('/admin')
})

router.post('/about-description', async (req, res) => {
    const { about_description } = req.body
    const portfolioData = await readData('portfolio.json')
    portfolioData.about.section_description = about_description
    await editData(portfolioData, 'portfolio.json')
    res.redirect('/admin')
})

router.post('/links', async (req, res) => {
    const { email, phone, telegram, github, youtube } = req.body
    const portfolioData = await readData('portfolio.json')
    portfolioData.email = email
    portfolioData.phone = phone
    portfolioData.telegram = telegram
    portfolioData.github = github
    portfolioData.youtube = youtube
    await editData(portfolioData, 'portfolio.json')
    res.redirect('/admin')
})

router.get('/remove-edu/:place', adminMiddleware, async (req, res) => {
    const portfolioData = await readData('portfolio.json')
    let { education } = portfolioData
    education = education.filter(edu => edu.education_place !== req.params.place)
    portfolioData.education = education
    await editData(portfolioData, 'portfolio.json')
    res.redirect('/admin')
})

router.post('/add-edu', async (req, res) => {
    const portfolioData = await readData('portfolio.json')
    portfolioData.education.push({
        id: uuid(),
        ...req.body
    })
    await editData(portfolioData, 'portfolio.json')
    res.redirect('/admin')
})

router.post('/add-exp', async (req, res) => {
    const portfolioData = await readData('portfolio.json')
    portfolioData.experience.push({
        id: uuid(),
        ...req.body
    })
    await editData(portfolioData, 'portfolio.json')
    res.redirect('/admin')
})

router.get('/remove-exp/:place', adminMiddleware, async (req, res) => {
    const portfolioData = await readData('portfolio.json')
    let { experience } = portfolioData
    experience = experience.filter(exp => exp.experience_place !== req.params.place)
    portfolioData.experience = experience
    await editData(portfolioData, 'portfolio.json')
    res.redirect('/admin')
})

router.get('/remove-skill/:skill', adminMiddleware, async (req, res) => {
    const portfolioData = await readData('portfolio.json')
    let { skills } = portfolioData
    skills = skills.filter(skill => skill.skill_name !== req.params.skill)
    portfolioData.skills = skills
    await editData(portfolioData, 'portfolio.json')
    res.redirect('/admin')
})

router.post('/edit-skills', async (req, res) => {
    const portfolioData = await readData('portfolio.json')
    portfolioData.skills = req.body
    await editData(portfolioData, 'portfolio.json')
    res.send({
        ok: true
    })
})

router.post('/new-project', fileUpload(), async (req, res) => {
    const projectPoster = req.files.project_poster
    const projectPosterPath = path.join(__dirname, '..', 'public', 'img', 'projects', req.body.project_title.replace(/ /g, '').toLowerCase() + '.' + projectPoster.mimetype.split('/')[1])
    await projectPoster.mv(projectPosterPath)
    const portfolioData = await readData('portfolio.json')
    portfolioData.projects.push({
        id: uuid(),
        ...req.body,
        project_poster: '/img/projects/' + req.body.project_title.replace(/ /g, '').toLowerCase() + '.' + projectPoster.mimetype.split('/')[1]
    })
    await editData(portfolioData, 'portfolio.json')
    res.send({
        ok: true
    })
})

router.get('/remove-project/:title', async (req, res) => {
    const portfolioData = await readData('portfolio.json')
    let { projects } = portfolioData
    let { project_poster } = projects.find(data => data.project_title === req.params.title)
    await fs.unlink(path.join(__dirname, '..', 'public') + project_poster)
    projects = projects.filter(project => project.project_title !== req.params.title)
    portfolioData.projects = projects
    await editData(portfolioData, 'portfolio.json')
    res.redirect('/admin')
})

module.exports = {
    router,
    path: '/admin'
}