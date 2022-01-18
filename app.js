const express = require('express')
const bp = require('body-parser')
const app = express()
const shop = require('./routes/shop')
const admin = require('./routes/admin')

app.set('views', 'views')
app.set('view engine', 'ejs')

// midllewares
app.use(bp.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use('/', shop)
app.use('/admin', admin.routes)
app.use((req, res) => {
  res.render('404.ejs', { pageTitle: 'Page Not Found' })
})

app.listen(3001, () => {
  console.log('3001')
})
