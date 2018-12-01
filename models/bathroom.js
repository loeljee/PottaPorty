module.exports = function(sequelize, DataTypes) {
  var Bathroom = sequelize.define("Bathroom", {
    name: {
      type: DataTypes.STRING,
      allowNull: false},

    location: {
      type: DataTypes.STRING,
      allowNull: false},

    keyRequired: {
      type: DataTypes.BOOLEAN,
      allowNull: true},

    doorCode: {
      type: DataTypes.INTEGER,
      allowNull: true},

    cleanliness: {
      type: DataTypes.INTEGER,
      allowNull: true},

    seperatedByGender: {
      type: DataTypes.BOOLEAN,
      allowNull: true},

    changingTable: {
      type: DataTypes.BOOLEAN,
      allowNull: true},
    privacy: {
      type: DataTypes.INTEGER,
      allowNull: true},

    tpSoftness: {
      type: DataTypes.INTEGER,
      allowNull: true}
  });
  return Bathroom;
};
