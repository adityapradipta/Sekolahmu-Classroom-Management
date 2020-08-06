const bcrypt = require('bcryptjs')

function encryptPassword(password) {
    let salt = bcrypt.genSaltSync(5)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    encryptPassword,
    comparePassword
}