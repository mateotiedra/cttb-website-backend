module.exports = (sequelize, DataTypes) => {
  const attributes = {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registrationData: DataTypes.STRING,
  };

  const Registrant = sequelize.define('registrant', attributes);

  Registrant.associate = (models) => {
    Registrant.belongsTo(models.event);
  };

  return Registrant;
};
