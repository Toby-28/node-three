const express = require('express')
const {
  getIndex,
  getProducts,
  getPorductDetail,
  getCart,
  postCart,
  getOrders,
} = require('../controllers/shop')

const router = express.Router()

router.get('/', getIndex)
router.get('/products', getProducts)
router.get('/delete')
router.get('/products/:productId', getPorductDetail)
router.get('/cart', getCart)
router.post('/cart', postCart)
router.get('/orders', getOrders)

module.exports = router
