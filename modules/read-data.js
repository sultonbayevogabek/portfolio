const path = require('path')
const fs = require('fs/promises')

const readData = async (fileName) => {
   const data = await fs.readFile(
       path.join(__dirname, '..', 'data', fileName),
       { encoding: 'utf-8' })
   return JSON.parse(data)
}

module.exports = readData