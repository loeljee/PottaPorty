module.exports = function(sequelize, DataTypes) {
  var Bathroom = sequelize.define("Bathroom", {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    keyRequired: DataTypes.BOOLEAN,
    doorCode: DataTypes.INTEGER,
    cleanliness: DataTypes.INTEGER,
    seperatedByGender: DataTypes.BOOLEAN,
    changingTable: DataTypes.BOOLEAN,
    privacy: DataTypes.INTEGER,
    tpSoftness: DataTypes.INTEGER
  });
  return Bathroom;
};
