const { User, Class, ClassSeat } = require('../models/index')
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

static create_class (req, res) {
  const {rows, columns} = req.body
  if(rows <= 0 || columns <= 0 || columns > 26 ) {
    res.status(400).json({
      message: 'rows and columns must be more than zero and maximum value of columns is 26'
    })
  } else {
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    Class.create({
      rows,
      columns,
      teachers: 'out'
    })
      .then(response => {
        let seats = []
        let ClassId = response.id
        for(let i = 1; i <= rows; i++) {
          for(let j = 1; j <= columns; j++) {
            seats.push({
              seat: `${i}${alphabet[j-1]}`,
              student_name: '',
              ClassId,
              UserId: null
            })
          }
        }
        return ClassSeat.bulkCreate(seats)
      })
      .then(response => {
        res.status(201).json({
          message: 'Class created'
        })
      })
      .catch(err => {
        res.status(500).json({
          err
        })
      })
  }
  
}

static check_in (req, res) {}
static check_out (req, res) {}
static get_class_list (req, res) {}
static get_class_by_id (req, res) {}

}

module.exports = Controller