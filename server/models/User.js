module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    timestamps: true
  })

  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      onDelete: "cascade",
    })

    Users.hasMany(models.Comments, {
      onDelete: "cascade"
    })
  }

  
  return Users
}