module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
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

  Users.associate = (models) => {
    // Users.hasMany(models.Likes, {
    //   onDelete: "cascade",
    // })

    Users.hasMany(models.Posts, {
      onDelete: "cascade",
    })
  }

  
  return Users
}