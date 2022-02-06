const mysqlPool = require('../util/mysqldb')

module.exports = class Product {
  constructor(id, t, i, p, d) {
    this.id = id
    this.title = t
    this.imgLink = i
    this.price = p
    this.description = d
  }

  save() {
    if (this.id) {
      return mysqlPool.execute(
        `update products set title=?, imgLink=?, price=?, description=? where id=?`,
        [this.title, this.imgLink, this.price, this.description]
      )
    } else {
      return mysqlPool.execute(
        'insert into products(title, imgLink, price, description) values(?,?,?,?)',
        [this.title, this.imgLink, this.price, this.description]
      )
    }
  }

  delete(id) {}

  static fetchAll() {
    return mysqlPool.execute('select * from products')
  }

  static getDetail(id) {
    return mysqlPool.execute(`select * from products where id=${id}`)
  }
}
