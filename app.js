const express = require('express')
const bp = require('body-parser')
const app = express()
const shop = require('./routes/shop')
const admin = require('./routes/admin')
const { get404 } = require('./controllers/error')
const mysqlPool = require('./util/mysqldb')

app.set('views', 'views')
app.set('view engine', 'ejs')

// midllewares
app.use(bp.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/', shop)
app.use('/admin', admin)
app.use(get404)

app.listen(3003, () => {
  console.log('3003')
})
