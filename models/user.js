const sequelize = require('../util/sequelize')
const Sequelize = require('sequelize')

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: { type: Sequelize.String },
  email: { type: Sequelize.String },
})

module.exports = User
