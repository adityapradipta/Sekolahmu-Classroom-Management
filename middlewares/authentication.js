const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentication (req, res, next) {
    let token = req.headers.token
    try {
        let decoded = verifyToken(token)
        let { id, role } = decoded
        User.findByPk(id)
            .then(data => {
                if(data) {
                    req.currentUserId = id
                    req.currentUserRole = role
                    next()
                } else {
                    res.status(401).json({
                        message: 'Please login first',
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    err
                })
            })
    } catch (err) {
        res.status(500).json({
            err
        })
    }
}

module.exports = {
    authentication
}