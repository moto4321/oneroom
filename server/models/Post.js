module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: true
  })

  // Users.associate = (models) => {
  //   Users.hasMany(models.Likes, {
  //     onDelete: "cascade",
  //   })

  //   Users.hasMany(models.Posts, {
  //     onDelete: "cascade",
  //   })
  // }

  
  return Posts
}