const Product = require('../models/product')
const Cart = require('../models/cart')

function getCart(res) {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = []
      for (product of products) {
        if (cart.products.find((p) => p.id === product.id)) {
          cartProducts.unshift(product)
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart',
        cartProducts: cartProducts,
      })
    })
  })
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
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

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
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

exports.getCart = (req, res, next) => {
  getCart(res)
}

exports.getPostCart = (req, res, next) => {
  const id = req.body.productId
  Product.getDetail(id, (product) => {
    Cart.addProducToCart(id, product.price)
  })
  getCart(res)
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'Orders',
    path: '/orders',
  })
}

exports.getPorductDetail = (req, res, next) => {
  const prodId = req.params.productId
  Product.getDetail(prodId)
    .then(([row, fieldData]) => {
      res.render('shop/product-detail', {
        pageTitle: row[0].title,
        product: row[0],
        path: '/product',
      })
    })
    .catch((err) => {
      console.log(err)
    })
}
