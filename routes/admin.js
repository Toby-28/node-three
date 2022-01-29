const express = require('express')
const { getAddProduct, pushProduct } = require('../controllers/admin')
const router = express.Router()

// /admin/add-product => GET
router.get('/add-product', getAddProduct)

// /admin/products => GET
router.get('/products')

// /admin/add-product => POST
router.post('/add-product', pushProduct)

module.exports = router
