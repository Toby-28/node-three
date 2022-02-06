const mysqlPool = require('../util/mysqldb')

module.exports = class Product {
  constructor(id, t, i, p, d) {
    this.id = id
    this.title = t
    this.imgLink = i
    this.price = p
    this.description = d
  }

  save() {}

  delete(id) {}

  static fetchAll() {
    return mysqlPool.execute('select * from products')
  }

  static getDetail(id) {
    return mysqlPool.execute(`select * from products where id=${id}`)
  }
}
