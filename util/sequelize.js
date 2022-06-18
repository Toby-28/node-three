const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  'node-complete-ecommerce',
  'postgres',
  'hushnud.22',
  {
    dialect: 'postgres',
    host: 'localhost',
  }
)

module.exports = sequelize
