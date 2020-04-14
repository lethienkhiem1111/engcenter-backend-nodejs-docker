
const bcrypt = require('bcryptjs');
const { Op }  = require('sequelize');

const db = require("../models/index.model");
const User = db.user;
const Role = db.role;

exports.getUser = (req, res) => {
  const userId = req.userId;
  User.findOne({
    where: {
      id: userId,
    },
  }).then((user) => {
    if (!user) {
      res.status(400).json({ message: "User not found !" });
    }
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  });
};

exports.getAllUser = (req, res) => {
  User.findAll()
    .then((users) => {
      if (!users) {
        res.status(200).json({ users: users });
      }
      let coveredUser = [];
      for (user of users) {
        const { id, username, email } = user;
        coveredUser.push({ id, username, email });
      }
      res.status(200).json({ users: coveredUser });
    })
    .catch((error) => next(error));
};

exports.createUser = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
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
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.editPasswordUser = (req, res) => {
  const userId = req.userId;
  const newPassword = bcrypt.hashSync(req.body.password, 8);
  User.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    if(!user) {
      res.status(404).json({ 
        "success": false,
        "message": "User not found"
       })
    }
    user.password = newPassword;
    user.save()
      .then((user) => {
        res.status(200).json({
          "success": true,
          "message": `${user.username} was updated successfully`
        })
      })
  })
  .catch(err => next(err));
};

exports.deleteUser = (req, res, next) => {
  const userId = req.userId;
  User.findOne({
    where: {
      id: userId
    }
  })
  .then(user => {
    if(!user) {
      res.status(404).json({ 
        "success": false,
        "message": "User not found"
       })
    }
    user.destroy()
      .then(() => {
        res.status(200).json({ 
          "success": true,
          "message": `${user.username} has deleted successfully`
        })
      })
  })
  .catch(err => next(err));
};
