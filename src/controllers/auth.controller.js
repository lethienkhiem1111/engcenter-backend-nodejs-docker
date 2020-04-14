const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const pathToKey = path.join(__dirname, "..", "..", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

const { Op } = require("sequelize");

const utils = require("../lib/utils");
const config = require("../config/auth.cofig");
const db = require("../models/index.model");
const User = db.user;
const Role = db.role;

exports.signUp = async (req, res) => {
  try {
    const saltHash = await utils.genPassword(req.body.password);
    const salt = saltHash.salt;
    const hashedPassword = saltHash.hash;
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      salt: salt,
    });
    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles,
          },
        },
      });
      await user.setRoles(roles);
      res.send({ message: "User was registered successfully!" });
      return;
    } else {
      // user role = 1
      await user.setRoles([1]);
      res.send({ message: "User was registered successfully!" });
      return;
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }

  // console.log(saltHash)
  // console.log(salt)
  // console.log(hashedPassword);
  // //Save user
  // User.create({
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: hashedPassword,
  //     salt: salt
  // })
  // .then(user => {
  //     if (req.body.roles) {
  //       Role.findAll({
  //         where: {
  //           name: {
  //             [Op.or]: req.body.roles
  //           }
  //         }
  //       }).then(roles => {
  //         user.setRoles(roles).then(() => {
  //           res.send({ message: "User was registered successfully!" });
  //           return;
  //         });
  //       });
  //     } else {
  //       // user role = 1
  //       user.setRoles([1]).then(() => {
  //         res.send({ message: "User was registered successfully!" });
  //         return;
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).send({ message: err.message });
  //   });
};

exports.signIn = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const isValid = utils.validPassword(
        req.body.password,
        user.password,
        user.salt
      );

      if (!isValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      // const token = jwt.sign({ id: user.id }, PRIV_KEY, { expiresIn: 86400 });
      const tokenObject = utils.issueJWT(user);

      let authorities = [];
      user.getRoles().then((roles) => {
        for (role of roles) {
          authorities.push("ROLE_" + role.name.toUpperCase());
        }
        // res.status(200).json({ success: true, token: tokenObject.token, expires: tokenObject.expires  });
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: tokenObject.token,
          expires: tokenObject.expires,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
