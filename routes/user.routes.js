const express = require('express')
const userController = require('../controllers/user.controller')
const router = express.Router()
const responder = require('../lib/baseResponse')
const authorizationMiddleware = require('../middleware/authorization.middleware')
const upload = require('../services/multer.service')



router.post('/update-profile-image', authorizationMiddleware.checkUserAuth, upload.single('profile_image'), async (req, res) => {
  try{
    const result = await userController.updateProfileImage(req.userID, req.file)
    res.json(responder.success(result))
  } 
  catch(err){
    res.json(responder.fail(err))
  }
})



module.exports = router