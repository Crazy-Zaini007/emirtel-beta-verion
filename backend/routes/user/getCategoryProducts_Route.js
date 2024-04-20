const  express = require('express');
const { getCategoryProducts,getAuthCategoryProducts } = require('../../controllers/userControllers/getCategoryProductsController');
const userAuth = require('../../middleware/user/userAuth')

const router=express.Router()

// For getting selected category all products when user is not loggedin
router.get(`/get/products/:id`,getCategoryProducts)

router.use(userAuth)
// For getting selected category all products when user is loggedin
router.get(`/get/auth/products/:id`,getAuthCategoryProducts)

module.exports = router
