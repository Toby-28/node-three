const Product = require('../models/product')

exports.pushProduct = (req, res, next) => {
  const { title, imgLink, price, description } = req.body
  req.user
    .createProduct({
      title: title,
      imgLink: imgLink,
      price: price,
      description: description,
    })
    .then(() => {
      res.redirect('/products')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getEditProduct = (req, res, next) => {
  const id = req.params.productId
  if (req.query.editMode) {
    Product.findByPk(id)
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
  Product.findByPk(id)
    .then((product) => {
      product.title = title
      product.imgLink = imgLink
      product.price = price
      product.description = description
      return product.save()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err)
    })
}

exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
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
  req.user
    .getProducts({ where: { id: id } })
    .then((products) => {
      return products[0].destroy()
    })
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      console.log(err)
    })
}
