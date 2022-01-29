const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  })
}

exports.pushProduct = (req, res, next) => {
  const { title, imgLink, price, description } = req.body
  const product = new Product(title, imgLink, price, description)
  product.save()
  res.redirect('/products')
}

exports.getEditProduct = (req, res, next) => {}

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    })
  })
}
