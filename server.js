const server = require('./app')
const { PORT } = require('./config')
server.listen(PORT, () => {
    console.log(`SERVER IS LISTENING AT: http://localhost:${PORT}`)
})