const  express = require('express');
const userAuth = require('../../middleware/user/userAuth')
const { addToCart,removeCart } = require('../../controllers/userControllers/wishlilistController');
const router=express.Router()

router.use(userAuth)
router.post("/add/wishlist",addToCart)
router.post("/delete/wishlist",removeCart)
module.exports = router
