const path = require('path')
const fs = require('fs/promises')
const readData = require('./read-data')

const editData = async (editedData, fileName) => {
    await fs.writeFile(
        path.join(__dirname, '..', 'data', fileName),
        JSON.stringify(editedData)
    )
}

module.exports = editData