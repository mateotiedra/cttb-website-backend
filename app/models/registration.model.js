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
    status: {
      type: DataTypes.ENUM('pending', 'active', 'cancelled'),
      defaultValue: 'pending',
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registrationData: DataTypes.STRING,
  };

  const Registration = sequelize.define('registration', attributes);

  Registration.associate = (models) => {
    Registration.belongsTo(models.event, {
      as: 'eventId',
      foreignKey: {
        name: 'id',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
  };

  return Registration;
};
