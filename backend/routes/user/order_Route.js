const  express = require('express');
const { placeOrder,updateOrderStatus } = require('../../controllers/userControllers/ordersController');
const userAuth = require('../../middleware/user/userAuth')

const router=express.Router()
router.use(userAuth)
router.post("/place/order",placeOrder)
router.patch("/cancel/order",updateOrderStatus)
module.exports = router
