const express = require('express')
const {
  getEditProduct,
  editProduct,
  pushProduct,
  getProducts,
} = require('../controllers/admin')
const router = express.Router()

router.get('/add-product', getEditProduct)
router.get('/edit-product/:productId', getEditProduct)

router.get('/products', getProducts)

router.post('/add-product', pushProduct)
router.post('/edit-product/:productId', editProduct)

module.exports = router
