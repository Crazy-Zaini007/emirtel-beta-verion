const  express = require('express');
const { getAllProducts, getLatestProducts,getAuthAllProducts,getAuthLatestProducts } = require('../../controllers/userControllers/productController');
const userAuth = require('../../middleware/user/userAuth')

const router=express.Router()

// For getting all products
router.get("/get/all/products",getAllProducts)
// For getting all latest products uploaded inlast 30 days products
router.get("/get/all/latest_products",getLatestProducts)

router.use(userAuth)
router.get("/auth/get/all/products",getAuthAllProducts)
// For getting all latest products uploaded inlast 30 days products
router.get("/auth/get/all/latest_products",getAuthLatestProducts)

module.exports = router
