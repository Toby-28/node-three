const Product = require('../models/product')
const Cart = require('../models/cart')

// Exports for Product Model

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((rows) => {
      res.render('shop/product-list', {
        pageTitle: 'All Products',
        path: '/products',
        products: rows,
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getPorductDetail = (req, res, next) => {
  const prodId = req.params.productId
  Product.findById(prodId)
    .then((row) => {
      res.render('shop/product-detail', {
        pageTitle: row.title,
        product: row,
        path: '/product',
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((rows) => {
      res.render('shop/index', {
        products: rows,
        pageTitle: 'Shop',
        path: '/',
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

//Exports for Card Model

exports.getCart = (req, res, next) => {
  Cart.findAll()
    .then((rows) => {
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        cartProducts: rows,
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getPostCart = (req, res, next) => {
  const id = req.body.productId
  Cart.findById(id)
    .then((row) => {
      res.render('shop/cart', {})
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getOrders = (req, res, next) => {}
