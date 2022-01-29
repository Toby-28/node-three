const express = require('express')
const { getAddProduct, pushProduct } = require('../controllers/products')
const router = express.Router()

// /admin/add-product => GET
router.get('/add-product', getAddProduct)

// /admin/add-product => POST
router.post('/add-product', pushProduct)

module.exports = router
