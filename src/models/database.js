const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.Student = require("./Student.js");
db.Course = require("./Course.js");

module.exports = db;