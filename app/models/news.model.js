module.exports = (sequelize, DataTypes) => {
  const attributes = {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    image: DataTypes.BLOB,
    links: DataTypes.JSON,
  };

  const News = sequelize.define('news', attributes);

  return News;
};
