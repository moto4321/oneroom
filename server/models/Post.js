module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: true
  })


  Posts.associate = (models) => {

    Posts.hasMany(models.Images, {
      onDelete: "cascade",
    })

    Posts.hasMany(models.Comments, {
      onDelete: "cascade"
    })
  }

  
  return Posts
}