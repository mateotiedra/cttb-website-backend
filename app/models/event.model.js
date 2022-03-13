module.exports = (sequelize, DataTypes) => {
  const attributes = {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    registrationOpened: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    description: DataTypes.STRING,
    pdf: DataTypes.BLOB,
    confirmationMessage: DataTypes.STRING,
  };

  const Event = sequelize.define('event', attributes);

  Event.associate = (models) => {
    Event.hasMany(models.registration, {
      foreignKey: {
        name: 'eventId',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
  };

  return Event;
};
