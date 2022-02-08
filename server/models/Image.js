module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define("Images", {
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    timestamps: true
  })
  
  return Images
}