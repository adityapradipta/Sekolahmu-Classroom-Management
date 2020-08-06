const { User, Class, ClassSeat } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

// async function classDetail(ClassId) {
//   let available_seats = []
//   let occupied_seats = []
//   let output = {}
//   await ClassSeat.findAll({
//       where: {
//         ClassId
//       },
//       include: [User, Class]
//     })
//       .then(data => {
//         for(let i = 0; i < data.length; i++) {
//           if(!data[i].student_name) {
//             available_seats.push(data[i].seat)
//           } else {
//             occupied_seats.push({
//               seat: data[i].seat,
//               student_name: data[i].student_name
//             })
//           }
//         }
//         return Class.findByPk(ClassId)
//       })
//       .then(data => {
//         output = {
//           class_id: data.id,
//           rows: data.rows,
//           columns: data.columns,
//           teacher: data.teacher,
//           available_seats,
//           occupied_seats
//         }
//         return output
//       })
//       .catch(err => {
//         return err
//       })
//   return output
// }

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
      teacher: 'out'
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

static check_in (req, res) {
  let role = req.currentUserRole
  let {ClassId, UserId} = req.body
  let available_seats = []
  let occupied_seats = []
  if(role == 'admin') {
    ClassSeat.findAll({
      where: {
        ClassId
      },
      include: [User, Class]
    })
      .then(data => {
        for(let i = 0; i < data.length; i++) {
          if(!data[i].student_name) {
            available_seats.push(data[i].seat)
          } else {
            occupied_seats.push({
              seat: data[i].seat,
              student_name: data[i].student_name
            })
          }
        }
        return Class.findByPk(+ClassId)
      })
      .then(data => {
        res.status(200).json({
          class_id: data.id,
          rows: data.rows,
          columns: data.columns,
          teacher: data.teacher,
          available_seats,
          occupied_seats
        })
      })
      .catch(err => {
        res.status(500).json({
          err
        })
      })
  } else if (role == 'teacher') {
    ClassSeat.findAll({
      where: {
        ClassId
      },
      include: [User, Class]
    })
      .then(data => {
        for(let i = 0; i < data.length; i++) {
          if(!data[i].student_name) {
            available_seats.push(data[i].seat)
          } else {
            occupied_seats.push({
              seat: data[i].seat,
              student_name: data[i].student_name
            })
          }
        }
        return Class.findByPk(+ClassId)
      })
      .then(data => {
        if(data.teacher == 'in') {
          res.status(400).json({
            class_id: data.id,
            rows: data.rows,
            columns: data.columns,
            teacher: data.teacher,
            available_seats,
            occupied_seats,
            message: 'teacher already check_in'
          })
        } else {
          return Class.update({
            teacher: 'in'
          },{
            where: {
              id: ClassId
            }
          })
        }
      })
      .then(response => {
        return Class.findByPk(+ClassId)
      })
      .then(data => {
        res.status(200).json({
          class_id: data.id,
          rows: data.rows,
          columns: data.columns,
          teacher: data.teacher,
          available_seats,
          occupied_seats,
          message: 'Check in success!'
        })
      })
      .catch(err => {
        res.status(500).json({
          err
        })
      })
  } else if (role == 'student') {
    let message = ''
    let name = req.currentUserName
    let seat = ''
    ClassSeat.findAll({
      where: {
        ClassId
      },
      include: [User, Class]
    })
      .then(data => {
        for(let i = 0; i < data.length; i++) {
          if(!data[i].student_name) {
            available_seats.push(data[i].seat)
          } else {
            occupied_seats.push({
              seat: data[i].seat,
              student_name: data[i].student_name
            })
          }
        }
        if(available_seats.length === 0) {
          message = `Hi ${name}, the class is fully seated`
          ClassSeat.findAll({
            where: {
              ClassId
            },
            include: [User, Class]
          })
          .then(data => {
            available_seats = []
            occupied_seats = []
            for(let i = 0; i < data.length; i++) {
              if(!data[i].student_name) {
                available_seats.push(data[i].seat)
              } else {
                occupied_seats.push({
                  seat: data[i].seat,
                  student_name: data[i].student_name
                })
              }
            }
            return Class.findByPk(+ClassId)
          })
          .then(data => {
            res.status(200).json({
              class_id: data.id,
              rows: data.rows,
              columns: data.columns,
              teacher: data.teacher,
              available_seats,
              occupied_seats,
              message
            })
          })
          .catch(err => {
            res.status(500).json({
              err
            })
          })
        } else {
          let isCheckIn = false
          for(let j = 0; j < occupied_seats.length; j++) {
            if (occupied_seats[j].student_name == name) {
              isCheckIn = true
              break;
            }
          }
          if(isCheckIn) {
            message = `Hi ${name}, you already check in`
            ClassSeat.findAll({
              where: {
                ClassId
              },
              include: [User, Class]
            })
            .then(data => {
              available_seats = []
              occupied_seats = []
              for(let i = 0; i < data.length; i++) {
                if(!data[i].student_name) {
                  available_seats.push(data[i].seat)
                } else {
                  occupied_seats.push({
                    seat: data[i].seat,
                    student_name: data[i].student_name
                  })
                }
              }
              return Class.findByPk(+ClassId)
            })
            .then(data => {
              res.status(200).json({
                class_id: data.id,
                rows: data.rows,
                columns: data.columns,
                teacher: data.teacher,
                available_seats,
                occupied_seats,
                message
              })
            })
            .catch(err => {
              res.status(500).json({
                err
              })
            })
          } else {
            seat = available_seats[0]
            message = `Hi ${name}, your seat is ${seat}`
            return ClassSeat.update({
              student_name: name,
              UserId
            }, {
              where: {
                ClassId,
                seat: available_seats[0]
              }
            })
          }
        }
      })
      .then(response => {
        return ClassSeat.findAll({
          where: {
            ClassId
          },
          include: [User, Class]
        })
      })
      .then(data => {
        available_seats = []
        occupied_seats = []
        for(let i = 0; i < data.length; i++) {
          if(!data[i].student_name) {
            available_seats.push(data[i].seat)
          } else {
            occupied_seats.push({
              seat: data[i].seat,
              student_name: data[i].student_name
            })
          }
        }
        return Class.findByPk(+ClassId)
      })
      .then(data => {
        res.status(200).json({
          class_id: data.id,
          rows: data.rows,
          columns: data.columns,
          teacher: data.teacher,
          available_seats,
          occupied_seats,
          message
        })
      })
      .catch(err => {
        res.status(500).json({
          err
        })
      })
  }
}

static check_out (req, res) {}
static get_class_list (req, res) {}
static get_class_by_id (req, res) {}

}

module.exports = Controller