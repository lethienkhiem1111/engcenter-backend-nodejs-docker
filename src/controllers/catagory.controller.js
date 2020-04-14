const db = require('../models/index.model');
const Catagory = db.catagory;

exports.createCatagory = (req, res, next) => {
    const { name, catagory_code } = req.body;
    Catagory.create({
        name: name,
        catagory_code: catagory_code
    })
    .then(catagory => {
        return res.status(200).json({
            success: true,
            catagory: catagory
        })
    })
    .catch(err => next(err))
}

exports.getCatagory = (req, res, next) => {
    const catagoryId = req.params.catagoryId;
    Catagory.findOne({
        where: {
            id: catagoryId
        }
    })
    .then(catagory => {
        if(!catagory) {
            return res.status(404).json({
                success: false,
                message: 'Catagory not found'
            })
        }
        return res.status(200).json({
            success: true,
            catagory: catagory
        })
    })
    .catch(err => next(err))
}

exports.getAllCatagories = (req, res, next) => {
    Catagory.findAll()
      .then((catagories) => {
        return res.status(200).json({
          success: true,
          catagories: catagories,
        });
      })
      .catch((err) => next(err));
  };
  
  exports.deleteCatagory = (req, res, next) => {
    const catagoryId = req.params.catagoryId;
    Catagory.findOne({
      where: {
        id: catagoryId,
      },
    })
      .then((catagory) => {
        if (!catagory) {
          return res.status(404).json({
            success: false,
            message: "Catagory not found",
          });
        }
        catagory.destroy().then(() => {
          return res.status(200).json({
            message: `Catagory has destroy with id: ${catagory.id}`,
          });
        });
      })
      .catch((err) => next(err));
  };
  