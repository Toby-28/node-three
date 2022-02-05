const fs = require('fs')
const path = require('path')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
)

module.exports = class Cart {
  //Fetch the previous cart
  static addProducToCart(id, price) {
    fs.readFile(p, (err, content) => {
      let cart = { products: [], totalPrice: 0 }
      let updatedProduct = { id: id, quantity: 1 }
      if (!err) {
        cart = JSON.parse(content)
      }
      //Analize the cart => find an existing product
      const existingProductIndex = cart.products.findIndex((p) => p.id === id)
      const existingProduct = cart.products[existingProductIndex]
      //Add new product/ increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct }
        updatedProduct.quantity++
        cart.products[existingProductIndex] = updatedProduct
      } else {
        cart.products.unshift(updatedProduct)
      }
      cart.totalPrice += +price // Huyawuy yeri akan
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err)
      })
    })
  }

  //get cart
  static getCart(cb) {
    fs.readFile(p, (err, content) => {
      if (!err) {
        cb(JSON.parse(content))
      } else {
        console.log(err)
      }
    })
  }
}
