require('dotenv').config()
const dbConnection = require('./lib/dbConfig')
const express = require('express')

const authRoutes = require('./routes/auth.routes')
// const homeRoutes = require('./routes/home.routes')
// const favoriteRoutes = require('./routes/favorite.routes')
const app = express()

dbConnection.connect()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/', authRoutes)
// app.use('/', homeRoutes)
// app.use('/favorites', favoriteRoutes)

app.use((req, res, next) => {
  throw Error('Invalid Path')
})

app.use((error, req, res, next) => {
  res.render('error')
})

app.listen(parseInt(process.env.PORT) || 3000)
