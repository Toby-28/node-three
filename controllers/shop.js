const Product = require('../models/product')

// Exports for Product Model

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
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
  Product.findByPk(prodId)
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
  req.user
    .getProducts()
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
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts()
    })
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

exports.postCart = (req, res, next) => {
  const id = req.body.productId
  let fetchedCart
  let newQuantity = 1
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart
      return cart.getProducts({ where: { id: id } })
    })
    .then((products) => {
      let product
      if (products.length > 0) {
        product = products[0]
      }
      if (product) {
        oldQuantity = product.cartItem.quantity
        newQuantity += oldQuantity
      }
      return Product.findByPk(id)
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      })
    })
    .then(() => {
      res.redirect('/cart')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getOrders = (req, res, next) => {}

exports.deleteCartItem = (req, res, next) => {
  const id = req.body.productId
}
