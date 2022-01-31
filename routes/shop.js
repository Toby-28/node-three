const express = require('express')
const {
  getIndex,
  getProducts,
  getCart,
  getPostCart,
  getCheckout,
  getOrders,
  getPorductId,
} = require('../controllers/shop')

const router = express.Router()

router.get('/', getIndex)
router.get('/products', getProducts)
router.get('/products/:productId', getPorductId)
router.get('/cart', getCart)
router.post('/cart', getPostCart)
router.get('/checkout', getCheckout)
router.get('/orders', getOrders)

module.exports = router
