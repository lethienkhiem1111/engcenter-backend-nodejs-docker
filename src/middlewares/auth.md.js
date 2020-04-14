const jwt = require("jsonwebtoken");
const path = require('path');
const fs = require('fs');
// const config = require("../config/auth.cofig");
const db = require("../models/index.model");
const User = db.user;

const pathToKey = path.join(__dirname, '..', '..','id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

//Verify token
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  console.log(PUB_KEY);
  jwt.verify(token, PUB_KEY, {algorithsm: ['RS256']}, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
        error: err
      });
    }
    console.log(decoded);
    req.userId = decoded.sub;
    next();
  });
};

isUser = (req, res, next) => {
  User.findByPk(req.userId)
    .then(user => {
      if(!user) {
        res.status(404).json({
          message: 'Some wrong maybe user have not sign in or do not existed !'
        })
        return;
      }
      next();
    })
    .catch((err) => {
      next(err);
    });
}

isAdmin = (req, res, next) => {
  User.findByPk(req.userId)
    .then((user) => {
      user.getRoles()
      .then((roles) => {
        
        for (role in roles) {
          if (roles[role].name === "admin") {
            next();
            return;
          }
        }
        res.status(403).json({
          message: "Require Admin Role!",
        });
      }).catch((err) => {
        next(err);
      });
    })
    .catch((err) => {
      next(err);
    });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!",
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!",
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isUser: isUser,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
};
module.exports = authJwt;
