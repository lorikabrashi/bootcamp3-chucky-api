require('dotenv').config()
const dbConnection = require('./lib/dbConfig')
const express = require('express')

const authRoutes = require('./routes/auth.routes')
const favoriteRoutes = require('./routes/favorite.routes')
const responder = require('./lib/baseResponse')

const app = express()

dbConnection.connect()

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/', authRoutes)
app.use('/api/', favoriteRoutes)

app.use((error, req, res, next) => {
  res.json(responder.fail(error))
})

app.listen(parseInt(process.env.PORT) || 3000)
