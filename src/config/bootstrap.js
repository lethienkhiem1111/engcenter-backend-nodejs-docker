const bcrypt = require('bcryptjs');
const db = require("../models/index.model");
const Role = db.role;
const User = db.user;
const Level = db.level;
const Catagory = db.catagory;
const Course = db.course;
const Class = db.class;
const Contact = db.contact;


exports.initialRole = function () {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "student",
  });

  Role.create({
    id: 3,
    name: "parent",
  });

  Role.create({
    id: 4,
    name: "teacher",
  });

  Role.create({
    id: 5,
    name: "staff",
  });

  Role.create({
    id: 6,
    name: "admin",
  });
};

exports.initialUser = function () {
    const roles = ["user", "admin"];
    User.create({
        username: "user",
        password: bcrypt.hashSync('student', 8),

    }
    )
    .then(user => {
        if (roles) {
          Role.findAll({
            where: {
              name: {
                [Op.or]: roles
              }
            }
          }).then(roles => {
            user.setRoles(roles).then(() => {
              res.send({ message: "User was registered successfully!" });
            });
          });
        } else {
          // user role = 1
          user.setRoles([1]).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        }
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
}
// "username": "user",
// 	"email": "user@gmail.com",
// 	"password": "student",
// 	"roles": ["user", "admin"]

exports.initialRole = function () {

}
// {
// 	"phone": "032232320",
// 	"address": "Can tho",
// 	"imageUrl": "imageUrl"
// }
// {
// 	"name": "Cap do A2",
// 	"level_code": "A2"
// }

// {
// 	"name": "Cap do nguoi lon",
// 	"course_code": "AD"
// }

// {
// 	"course_code": "A2",
// 	"course_name": "Khoa AVCB A2",
// 	"start_day": "2017-11-01T14:50:33.239Z",
// 	"end_day": "2017-11-01T14:50:33.239Z",
// 	"levelId": 1,
// 	"catagoryId": 1
// }

// {
// 	"class_code": "A2",
// 	"class_name": "Lop A2",
// 	"start_day": "2017-11-01T14:50:33.239Z",
// 	"weeks": 10,
// 	"fee": 1500000,
// 	"courseId": 1
// }