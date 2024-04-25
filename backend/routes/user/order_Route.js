const  express = require('express');
const { placeOrder } = require('../../controllers/userControllers/ordersController');
const userAuth = require('../../middleware/user/userAuth')

const router=express.Router()
router.use(userAuth)
router.post("/place/order",placeOrder)
module.exports = router
