const express = require('express')
const router = express.Router()
const responder = require('../lib/baseResponse')
const authorizationMiddleware = require('../middleware/authorization.middleware')
router.get('/', (req, res) => {
  res.render('favorites')
})


router.post('/add-to-favorites', authorizationMiddleware.checkAuth, async (req, res)=> {
  try{
    // add to favorites
    console.log(req.userID)
    res.json(responder.success('added to favorites'))
  } 
  catch(err){
    res.json(responder.fail(err))
  }
})

module.exports = router