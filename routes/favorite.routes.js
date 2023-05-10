const express = require('express')
const router = express.Router()
const fetchController = require('../controllers/fetch.controller')

router.get('/', (req, res) => {
  res.render('favorites')
})

module.exports = router