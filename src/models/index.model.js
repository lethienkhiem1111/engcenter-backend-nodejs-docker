const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.profile = require("../models/profile.model")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.course = require("../models/course.model")(sequelize, Sequelize);
db.class = require("../models/class.model")(sequelize, Sequelize);
db.level = require("../models/level.model")(sequelize, Sequelize);
db.catagory = require("../models/catagory.model")(sequelize, Sequelize);
db.outline = require("../models/outline.model")(sequelize, Sequelize);
db.score = require("../models/score.model")(sequelize, Sequelize);
db.contact = require("../models/contact.model")(sequelize, Sequelize);
db.enrollment = require("../models/enrollment.model")(sequelize, Sequelize);
db.introduction = require("../models/introduction.model")(sequelize, Sequelize);
db.schedule = require("../models/schedule.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.user.hasOne(db.profile);
db.profile.belongsTo(db.user);

db.course.hasMany(db.class);
db.class.belongsTo(db.course);

db.user.belongsToMany(db.class, { through: "UserClasses" });
db.class.belongsToMany(db.user, { through: "UserClasses" });

db.level.hasMany(db.course);
db.course.belongsTo(db.level);

db.catagory.hasMany(db.course);
db.course.belongsTo(db.catagory);

db.class.hasMany(db.outline);
db.outline.belongsTo(db.class);

db.class.hasMany(db.score);
db.score.belongsTo(db.class);

db.course.hasMany(db.enrollment);
db.enrollment.belongsTo(db.course);

db.user.hasOne(db.contact);
db.contact.belongsTo(db.user);

db.user.hasMany(db.schedule);
db.schedule.belongsTo(db.user);

db.class.hasMany(db.schedule);
db.schedule.belongsTo(db.class);

db.ROLES = ["user", "student", "teacher", "staff", "admin"];

module.exports = db;