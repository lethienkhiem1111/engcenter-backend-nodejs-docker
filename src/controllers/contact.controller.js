const db = require('../models/index.model');
const { Op } = require("sequelize");
const Contact = db.contact;

exports.createContact = (req, res, next) => {
    const { 
        content,
        userId, 
        class_id, 
        auth_name, 
        auth_id
    } = req.body;
    Contact.create({
        content: content,
        userId: userId,
        class_id: class_id,
        auth_id: auth_id,
        auth_name: auth_name
    })
    .then((contact) => {
        return res.status(200).json({
            success: true,
            contact: contact
        })
    })
    .catch(err => next(err))
}

exports.getContactsByClassUserId = (req, res, next) => {
    const classId = req.params.classId;
    const studentId = req.params.studentId;
    Contact.findAll({
        where: {
            [Op.and]: [{ class_id: classId }, { userId: studentId }], 
        }
    })
    .then(contacts => {
        
        return res.status(200).json({
            success: false,
            contacts: contacts
        })
    })
    .catch(err => next(err))
}
exports.deleteContact = (req, res, next) => {
    const contactId = req.params.contactId;
    Contact.findOne({
      where: {
        id: contactId,
      },
    })
      .then((contact) => {
        if (!contactId) {
          return res.status(404).json({
            success: false,
            message: "Contact not found",
          });
        }
        contact.destroy().then(() => {
          return res.status(200).json({
            message: `Contact has destroy with id: ${contact.id}`,
          });
        });
      })
      .catch((err) => next(err));
  };