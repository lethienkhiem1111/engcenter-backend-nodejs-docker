const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
const multer = require('multer');

const db = require("./src/models/index.model");
const Role = db.role;

const error = require('./src/controllers/error.controller');

const app = express();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

function initial() {
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

//Set Routes
require('./src/routes/index.routes')(app);

app.use(error.error404);
// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
