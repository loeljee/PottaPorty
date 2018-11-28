module.exports = function(sequelize, DataTypes) {
  var Bathroom = sequelize.define("Bathroom", {
    name: DataTypes.STRING,
    location: DataTypes.STRING
  });
  return Bathroom;
};
