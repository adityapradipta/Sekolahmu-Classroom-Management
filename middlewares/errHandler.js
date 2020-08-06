module.exports = (err, req, res, next) => {
    // console.log(err)
    // res.send(err)
    if(err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError') {
        let errors = err.errors.map(el => ({
            message: el.message
        }))
        res.status(400).json({
            err: errors
        })
    } else if(err.name == 'JsonWebTokenError'){
        res.status(401).json({
            err: 'Please login first'
        })
    } else if(err.code) {
        res.status(err.code).json({
            err: err.msg
        })
    } else {
        res.status(500).json({
            msg: 'internal server error',
            err: err
        })
    }
}