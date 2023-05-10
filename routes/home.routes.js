const express = require('express')
const router = express.Router()
const fetchController = require('../controllers/fetch.controller')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/search', async (req, res)=> {
  const jokes = await fetchController.fetchJokes(req.body.searchText)
  res.render('index', { jokes: jokes })
})

router.post('/random', async (req, res) => {
  const randomJoke = await fetchController.fetchRandomJoke()
  res.render('index', { jokes: randomJoke })
})

module.exports = router