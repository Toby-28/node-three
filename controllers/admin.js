const Product = require('../models/product')

exports.pushProduct = (req, res, next) => {
  const { title, imgLink, price, description } = req.body
  const product = new Product(null, title, imgLink, price, description)
  product
    .save()
    .then((message) => {
      console.log(message)
      res.redirect('/products')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getEditProduct = (req, res, next) => {
  const id = req.params.productId
  if (req.query.editMode) {
    Product.getDetail(id)
      .then(([row, fieldData]) => {
        res.render('admin/edit-product', {
          pageTitle: 'Edit Product',
          path: '/admin/edit-product',
          product: row[0],
          editMode: true,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  } else {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editMode: false,
    })
  }
}

exports.editProduct = (req, res, next) => {
  const id = req.params.productId
  const { title, imgLink, price, description } = req.body
  const updatedProduct = new Product(id, title, imgLink, price, description)
  updatedProduct
    .save()
    .then((message) => {
      console.log(message)
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err)
    })
  res.redirect('/')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('admin/products', {
        pageTitle: 'Admin Products',
        path: '/admin/products',
        products: rows,
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.deleteProduct = (req, res, next) => {
  const id = req.params.productId
  const product = new Product()
  product.delete(id)
  res.redirect('/')
}
