const express = require('express')
const bp = require('body-parser')
const app = express()
const shop = require('./routes/shop')
const admin = require('./routes/admin')
const { get404 } = require('./controllers/error')
const sequelize = require('./util/sequelize')
const Product = require('./models/product')
const User = require('./models/user')
const Cart = require('./models/cart')
const CartItem = require('./models/cart-item')

app.set('views', 'views')
app.set('view engine', 'ejs')

// midllewares
app.use(bp.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user
      next()
    })
    .catch((err) => {
      console.log(err)
    })
})
app.use('/', shop)
app.use('/admin', admin)
app.use(get404)

// Aliasing Sequelize associations
Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE',
})
User.hasMany(Product)
Cart.belongsTo(User)
User.hasOne(Cart)
Cart.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(Cart, { through: CartItem })

// Sequelize syncing to build database as needed
sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    return User.findByPk(1)
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: 'Hushnudbek',
        email: 'tobymarshal2802@gmail.com',
      })
    }
    return user
  })
  .then((user) => {
    user
      .getCart()
      .then((cart) => {
        if (!cart) {
          return user.createCart()
        }
        return
      })
      .catch((err) => {
        console.log(err)
      })
  })
  .then(() => {
    app.listen(3003)
  })
  .catch((err) => {
    console.log(err)
  })
