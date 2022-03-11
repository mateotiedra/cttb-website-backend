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
      allowNull: false,
      defaultValue: false,
    },
    description: DataTypes.STRING,
    pdf: DataTypes.BLOB,
  };

  const Event = sequelize.define('event', attributes);

  Event.associate = (models) => {
    Event.hasMany(models.registration, {
      as: 'eventId',
      foreignKey: {
        name: 'id',
        allowNull: false,
      },
      onDelete: 'cascade',
    });
  };

  return Event;
};
