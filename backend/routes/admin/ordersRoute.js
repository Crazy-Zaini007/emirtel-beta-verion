const  express = require('express');
const { getOrders,updateOrderStatus } = require('../../controllers/adminControllers/adminOrdersController');
const adminAuth = require('../../middleware/admin/adminAuth')

const router=express.Router()

router.use(adminAuth)

// For getting all Orders
router.get("/get/orders",getOrders)
router.patch("/update/order",updateOrderStatus)


module.exports = router
