module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define("Images", {
    image: {
      type: DataTypes.BLOB(long),
      allowNull: false
    },
  },
  {
    timestamps: true
  })
  
  return Images
}