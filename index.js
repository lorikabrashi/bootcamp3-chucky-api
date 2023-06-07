require('dotenv').config()
const dbConnection = require('./lib/dbConfig')
const express = require('express')
var cors = require('cors')
const authRoutes = require('./routes/auth.routes')
const favoriteRoutes = require('./routes/favorite.routes')
const userRoutes = require('./routes/user.routes')

const responder = require('./lib/baseResponse')


const app = express()

dbConnection.connect()

app.use(cors())
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/', authRoutes)
app.use('/api/', favoriteRoutes)
app.use('/api/user/', userRoutes)

app.use((error, req, res, next) => {
  console.log('here')
  res.json(responder.fail(error))
})

app.listen(parseInt(process.env.PORT) || 3000)
