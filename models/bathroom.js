// module.exports = function(sequelize, DataTypes) {
//   var Bathroom = sequelize.define("bathrooms", {
//     id: DataTypes.INTEGER,
//     name: DataTypes.STRING,
//     street: DataTypes.STRING,
//     city: DataTypes.STRING,
//     state: DataTypes.STRING,
//     country: DataTypes.STRING,
//     comment: DataTypes.STRING
//   });
//   return Bathroom;
// };


var orm = require("../config/orm.js");

var bathroom = {
  all: function(cb) {
    orm.all("bathrooms", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("bathrooms", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("bathrooms", objColVals, condition, function(res) {
      cb(res);
    });
  }
};


module.exports = bathroom;
