
const db = require('../models/index.model');
const ROLES = db.ROLES;
const User = db.user;



//Check duplicate Username and email
checkDuplicateUsernameOrEmail = (req, res, next) => {
    //Username
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if(user) {
            res.status(400).json({
                message: 'Username is aldready in use!'
            })
            return;
        }
        
    })
    .catch(err => {
        next(err);
    })

    //Email
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(user => {
        if(user) {
            res.status(400).json({
                message: 'Email is aldready in use!'
            })
            return;
        }
        next()
    })
    .catch(err => {
        next(err);
    })
    
}

//Check roles
checkRolesExisted = (req, res, next) => {
    let roles = req.body.roles;
    console.log(roles)
    if(roles) {
        for(role of roles) {
            console.log(role)
            console.log(ROLES.includes(role))
            if(!ROLES.includes(role)) {
                res.status(400).json({
                    message: 'Role does not exist!' + role
                })
                return
            }
        }
    }
    next();
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
}

module.exports = verifySignUp;