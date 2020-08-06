const { User, Class } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller {

static login (req, res) {
  let {email, password} = req.body
    User.findOne({
      where: {
        email
      }
    })
      .then(data => {
        if(data) {
          let compare = comparePassword(password, data.password)
          if(compare) {
            let token = generateToken({
              id: data.id,
              name: data.name,
              email: data.email,
              role: data.role
            })
            res.status(200).json({
              token,
              data: {
                id: data.id,
                name: data.name,
                email: data.email,
                role: data.role    
              },
              message: `Welcome Back ${data.name}!`
            })        
          } else {
            res.status(401).json({
              message: 'Please input correct password'
            })      
          }
        } else {
          res.status(401).json({
            message: 'Please input registered email'
          }) 
        }
      })
      .catch(err => {
        res.status(500).json({
          err
        })
      })
}

static create_class (req, res) {}
static check_in (req, res) {}
static check_out (req, res) {}
static get_class_list (req, res) {}
static get_class_by_id (req, res) {}

}

module.exports = Controller