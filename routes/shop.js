const express = require('express')
const { getIndex, getProducts } = require('../controllers/shop')

const router = express.Router()

router.get('/', getIndex)
router.get('/products', getProducts)
router.get('/cart')
router.get('/checkout')

module.exports = router
