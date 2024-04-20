const  express = require('express');
const {userSignup,userLogin,getUserProfile}=require('../../controllers/userControllers/joinUserController')
const userAuth = require('../../middleware/user/userAuth')

const router=express.Router()
//User Signup Controller 
router.post("/register",userSignup)
router.post("/login",userLogin)
router.use(userAuth)

// Getting User Profile
router.get('/get/profile',getUserProfile)
module.exports = router
