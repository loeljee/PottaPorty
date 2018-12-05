module.exports = function(sequelize, DataTypes) {
  var Bathroom = sequelize.define("Bathroom", {
    //id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    comment: DataTypes.STRING
  });
  return Bathroom;
};

