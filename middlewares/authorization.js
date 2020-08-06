const { User } = require('../models')

function adminAuthorization (req, res, next) {
    User.findByPk(req.currentUserId)
        .then(data => {
            if(data) {
                if(data.role === 'admin') {
                    next()
                } else {
                    res.status(401).json({
                        message: 'unauthorized'
                    })
                }
            } else {
                res.status(404).json({
                    message: 'User not found'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        })
}


module.exports = {
    adminAuthorization
}