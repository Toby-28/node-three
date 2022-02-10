const Product = require('../models/product')

exports.pushProduct = (req, res, next) => {
  const { title, imgLink, price, description } = req.body
  Product.create({
    title: title,
    imgLink: imgLink,
    price: price,
    description: description,
  })
    .then((result) => {
      console.log(result)
      res.redirect('/products')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getEditProduct = (req, res, next) => {
  const id = req.params.productId
  if (req.query.editMode) {
    Product.findById(id)
      .then((row) => {
        res.render('admin/edit-product', {
          pageTitle: 'Edit Product',
          path: '/admin/edit-product',
          product: row,
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
  Product.findById(id)
    .then((product) => {
      product.title = title
      product.imgLink = imgLink
      product.price = price
      product.description = description
      return product.save()
    })
    .then((result) => {
      console.log(result)
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((rows) => {
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
  Product.findById(id)
    .then((row) => {
      return row.destroy()
    })
    .then((result) => {
      console.log(result)
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err)
    })
}
