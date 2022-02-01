const Product = require('../models/product')
const Cart = require('../models/cart')

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    })
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    })
  })
}

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart',
  })
}

exports.getPostCart = (req, res, next) => {
  const id = req.body.productId
  Product.getDetail(id, (product) => {
    Cart.addProducToCart(id, product.price)
  })
  res.render('shop/cart', {
    pageTitle: 'Your Cart',
    path: '/cart',
  })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkouts',
    path: '/checkout',
  })
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
  })
}

exports.getPorductId = (req, res, next) => {
  const prodId = req.params.productId
  Product.getDetail(prodId, (product) => {
    res.render('shop/product-detail', {
      pageTitle: product.title,
      product: product,
      path: '/products',
    })
  })
}
