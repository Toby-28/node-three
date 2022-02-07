const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-complete', 'root', 'hushnud.22', {
  dialect: 'mysql',
  host: 'localhost',
})

module.exports = sequelize
