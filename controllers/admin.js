const Product = require('../models/product')

exports.pushProduct = (req, res, next) => {
  const { title, imgLink, price, description } = req.body
  const product = new Product(null, title, imgLink, price, description)
  product.save()
  res.redirect('/products')
}

exports.getEditProduct = (req, res, next) => {
  const id = req.params.productId
  let obj = {}
  Product.getDetail(id, (product) => {
    if (req.query.editMode) {
      obj = {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        product: product,
        editMode: true,
      }
    } else {
      obj = {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        product: product,
        editMode: false,
      }
    }
    res.render('admin/edit-product', obj)
  })
}

exports.editProduct = (req, res, next) => {
  const id = req.params.productId
  const { title, imgLink, price, description } = req.body
  const updatedProduct = new Product(id, title, imgLink, price, description)
  updatedProduct.save()
  res.redirect('/')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    })
  })
}

exports.deleteProduct = (req, res, next) => {
  const id = req.params.productId
  const product = new Product()
  product.delete(id)
  res.redirect('/')
}
