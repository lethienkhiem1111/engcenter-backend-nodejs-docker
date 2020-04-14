const db = require('../models/index.model');
const User = db.user;
const Profile = db.profile;

exports.createProfile = (req, res, next) => {
    const userId = req.userId;
    const { fullname, birthday, phone, address, imageUrl } = req.body;
    Profile.findOne({
        where: {
            userId: userId
        }
    })
    .then(profile => {
        console.log(profile)
        if(profile) {
            res.status(409).json({
                success: false,
                message: 'Profile is existed'
            })
        }
        User.findOne({
            where: {
                id: userId
            }
        })
        .then(user => {
            user.createProfile({
                "fullname": fullname,
                "birthday": birthday,
                "phone": phone,
                "address": address,
                "imageUrl": imageUrl
            })
            .then(profile => {
                res.status(200).json({
                    success: true,
                    profile: profile
                })
            })
            .catch(err => next(err))
        })
    })
    .catch(err => next(err))
}

exports.getProfile = (req, res , next) => {
    const userId = req.params.userId;
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
        user.getProfile()
            .then(profile => {
                if(!profile) {
                    res.status(404).json({
                        "success": false,
                        "message": "Profile not found"
                    })
                }
                res.status(200).json({
                    "success": true,
                    "profile": profile
                })
            })
            .catch(err => next(err))
    })
    .catch(err => next(err))
}

exports.editProfile = (req, res, next) => {
    const profileId = req.params.profileId;
    const { fullname, birthday, phone, address, imageUrl } = req.body;
    Profile.findOne({
        where: {
            id: profileId
        }
    })
    .then(profile => {
        if(!profileId) {
            res.status(404).json({
                "success": false,
                "message": "Profile not found"
            })
            return;
        }

        profile.fullname = fullname,
        profile.birthday = birthday,
        profile.phone = phone,
        profile.address = address,
        profile.imageUrl = imageUrl
        profile.save()
            .then(profile => {
                if(!profile) {
                    res.status(404).json({
                        "success": false,
                        "message": "Update some wrong"
                    })
                }
                res.status(200).json({
                    "success": true,
                    "profile": profile
                })
            })

    })
}

exports.deleteProfile = (req, res, next) => {
    const profileId = req.params.profileId;
    Profile.findOne({
      where: {
        id: profileId,
      },
    })
      .then((profile) => {
        if (!profile) {
          return res.status(404).json({
            success: false,
            message: "Profile not found",
          });
        }
        profile.destroy().then(() => {
          return res.status(200).json({
            message: `Profile has destroy with id: ${profile.id}`,
          });
        });
      })
      .catch((err) => next(err));
  };