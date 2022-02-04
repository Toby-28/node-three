const express = require('express')
const {
  getIndex,
  getProducts,
  getCart,
  getPostCart,
  getCheckout,
  getOrders,
  getPorductDetail,
} = require('../controllers/shop')

const router = express.Router()

router.get('/', getIndex)
router.get('/products', getProducts)
router.get('/delete')
router.get('/products/:productId', getPorductDetail)
router.get('/cart', getCart)
router.post('/cart', getPostCart)
router.get('/checkout', getCheckout)
router.get('/orders', getOrders)

module.exports = router
