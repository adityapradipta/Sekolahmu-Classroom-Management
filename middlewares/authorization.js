const { Cart } = require('../models')

function authorization (req, res, next) {
    let { CartId } = req.params
    Cart.findByPk(CartId)
        .then(data => {
            if(data) {
                console.log(data)
                console.log(req.currentUserId)
                if(data.CustomerId == req.currentUserId) {
                    next()
                } else {
                    throw {
                        msg: 'Unauthorized',
                        code: 401
                    }
                }
            } else {
                throw {
                    msg: 'Cart not found',
                    code: 404
                }
            }
        })
        .catch(err => {
            next(err)
        })
}

module.exports = authorization