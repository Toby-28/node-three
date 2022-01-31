const fs = require('fs')
const path = require('path')
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
)
const getProducts = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (!err) {
      cb(JSON.parse(fileContent))
    } else {
      cb([])
    }
  })
}

module.exports = class Product {
  constructor(t, i, p, d) {
    this.title = t
    this.imgLink = i
    this.price = p
    this.description = d
  }

  save() {
    this.id = Math.random().toString()
    getProducts((products) => {
      products.unshift(this)
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err)
      })
    })
  }

  static fetchAll(cb) {
    getProducts(cb)
  }

  static getDetail(id, cb) {
    getProducts((products) => {
      const product = products.find((product) => product.id === id)
      cb(product)
    })
  }
}
